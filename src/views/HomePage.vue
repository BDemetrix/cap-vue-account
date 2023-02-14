<template>
    <div class="login wrapper">
        <img class="logo" src="@/assets/logo.png" alt="Логотип" />
        <h4 style="margin-bottom: 42px">Вы вошли в личный кабинет</h4>

        <!-- <button class="btn" type="button" @click="push">
            {{ btnText }}
        </button> -->
        <button class="btn" type="button" v-if="!fcmSigned" @click="registerNotifications">
            Подписаться на Push
        </button>
        <button class="btn" type="button" v-if="fcmSigned" @click="sendPush">
            Отправить Push
        </button>

        <textarea rows="10" :value="token">Здесь будет токен</textarea>
<!--         <button class="btn" type="button" @click="unSubscribe" v-if="fcmSigned">
            Отписаться
        </button> -->
    </div>
</template>

<script>
import { initializeApp } from "firebase/app";
//import { getMessaging, getToken } from "firebase/messaging";
import { PushNotifications } from "@capacitor/push-notifications";

// const fb = initializeApp(firebaseConfig);
/* const PUBLIC_VAPID_KEY = "BP18qEecjZuO4Yi_xtG6jlmqk7EHGCqpc46zH6cuanWlqL7nXpKyfPJmmToFqdxD55rENrF_STkXjoX4U4KOxJw"; */

export default {
    name: "HomePage",
    data() {
        return {
            token: '',
            fcmSigned: !!window.localStorage.getItem("fcmSigned"),
            btnText: this.fcmSigned ? "Отправить Push" : "Подписаться на Push",
            fb: initializeApp(this.firebaseConfig),
            PUBLIC_VAPID_KEY:
                "BP18qEecjZuO4Yi_xtG6jlmqk7EHGCqpc46zH6cuanWlqL7nXpKyfPJmmToFqdxD55rENrF_STkXjoX4U4KOxJw",
        };
    },
    props: {
        firebaseConfig: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async push() {
            this.fcmSigned ? (await this.sendPush()) : (await this.registerNotifications());
        }, 

        async sendPush() {

            let token = window.localStorage.getItem('token');
            alert(token)
            // token = 'fcJAjyo-Q0aVTFOlX1W0I3:APA91bE_svf-3L8z2lmpxtdFCtge4Cx0lsEqstpXmI9Xnah0y2d8qWIJ_606Gv1aKJhlRp4swoFBfj5LrKeQ9AD4d7QZadhkVZjpMeRKfmUnqzSHWk9ba3UGW0ysCajp5dov_oGP1E2c';

            if(!this.fcmSigned) {
                alert('Подписка не оформлена')
                return
            }

            if(!token) {
                alert('Токен не найден. Возможно подписка не оформлена.')
                return;
            }
            
            window.localStorage.setItem("fcmSigned", "1");

            const ACCESS_TOKEN =
                "key=AAAAczkkdTk:APA91bG3gFEALwglHyMkFReUpOGmK38qQFCqJ1uerVqxP5buPJb33ZcWvB0LrTfmWks5hdjdlv6WujZxJO79-Frk6EdIcxKq6nCPCWDm36U8xlc2yoL6Ywt-Exo80njbSkHLO0mhV7GV";
            const data = {
                to: token,
                direct_boot_ok: true,
                notification: {
                    title: "Тестовое сообщение!",
                    body: "Тестовое сообщение. \n Кликни для перехода google.com",
                },
                data: {
                    //icon: "https://cdn-icons-png.flaticon.com/512/8910/8910792.png",
                    url: "https://google.com/",
                },
            };

            fetch("https://fcm.googleapis.com/fcm/send", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // , *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "omit", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    Authorization: ACCESS_TOKEN,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                //redirect: 'follow', // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *client
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((/* text */) => {
                    // console.log(text)
                    alert('сообщение отправлено')
                })
                .catch((e) => console.log(e));
        },

        async addListeners() {
            await PushNotifications.addListener("registration", (token) => {
                console.info("Registration token: ", token.value);
                alert('Подписка оформлена: ' + token.value);
                this.btnText = 'Отправить Push';
                window.localStorage.setItem('token', token.value)
                window.localStorage.setItem('fcmSigned', '1')
                this.fcmSigned = true
                this.token = token.value
            });

            await PushNotifications.addListener("registrationError", (err) => {
                console.error("Registration error: ", err.error);
            });

            await PushNotifications.addListener(
                "pushNotificationReceived",
                (notification) => {
                    console.log("Push notification received: ", notification);
                    alert('Push notification received');
                    // alert(notification);
                    notification.push();
                }
            );

            await PushNotifications.addListener(
                "pushNotificationActionPerformed",
                (notification) => {
                    console.log(
                        "Push notification action performed",
                        notification.actionId,
                        notification.inputValue
                    );
                    alert('Push notification action performed') 
                }
            );
        },

        async registerNotifications() {
            let permStatus = await PushNotifications.checkPermissions();

            if (permStatus.receive === "prompt") {
                permStatus = await PushNotifications.requestPermissions();
            }

            if (permStatus.receive !== "granted") {
                throw new Error("User denied permissions!");
            }

            await PushNotifications.register();

        },

        async getDeliveredNotifications() {
            const notificationList = await PushNotifications.getDeliveredNotifications();
            console.log("delivered notifications", notificationList);
        },
    },
    async mounted() {
        this.btnText = this.fcmSigned
            ? "Отправить Push"
            : "Подписаться на Push";
        
        await this.addListeners();
    },
};
</script>

<style scoped>
    textarea {
        width: 100%;
    }
</style>

