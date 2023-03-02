<template>
    <div class="login wrapper">
        <back-arrow @go-back="goBack"/>
        <img class="logo" src="@/assets/logo.png" alt="Логотип" />
        <h4 style="margin-bottom: 42px">Вы вошли в личный кабинет</h4>

        <!-- <button class="btn" type="button" @click="push">
            {{ btnText }}
        </button> -->
        <button
            class="btn"
            type="button"
            v-if="!fcmSigned"
            @click="registerNotifications"
        >
            Подписаться на Push
        </button>
        <button class="btn" type="button" v-if="fcmSigned" @click="sendPush">
            Отправить Push
        </button>

        <label class="label">Токен</label>
        <textarea  class="textarea" rows="7" ref="textarea" >Здесь будет токен</textarea>

        <label class="label">Заголовок Push</label>
        <input
            class="input"
            type="text"
            placeholder="Заголовок Push"
            autocomplete="off"
            v-model="pushMsg.title"
        />
        <label class="label">Текст Push</label>
        <textarea
            class="textarea"
            placeholder="Текст Push"
            autocomplete="off"
            v-model="pushMsg.text"
        />

        <!--         <button class="btn" type="button" @click="unSubscribe" v-if="fcmSigned">
            Отписаться
        </button> -->
    </div>
</template>

<script>
import BackArrow from "@/assets/components/BackArrow.vue"
import { PushNotifications } from "@capacitor/push-notifications"
import { mapMutations } from "vuex";
// import { mapActions } from "vuex";

export default {
    name: "PushPage",
    components: {
        BackArrow
    },
    data() {
        return {
            pushMsg: {
                title: "Тест!",
                text: "Текст сообщения. Кликни для перехода",
            },
            token: "",
            fcmSigned: !!window.localStorage.getItem("fcmSigned"),
            btnText: this.fcmSigned ? "Отправить Push" : "Подписаться на Push",
        };
    }, 
    methods: {
        ...mapMutations('updateLogged'),

        goBack() { 
            window.localStorage.setItem("fcmSigned", "")
            this.updateLogged('')
        },
        async push() {
            this.fcmSigned
                ? await this.sendPush()
                : await this.registerNotifications();
        },

        async sendPush() {
            let token = this.$refs.textarea.value.trim()

            if (!this.fcmSigned) {
                alert("Подписка не оформлена");
                return;
            }

            if (!token) {
                alert("Токен не найден. Возможно подписка не оформлена.");
                return;
            }

            console.log(token);
            window.localStorage.setItem("fcmSigned", "1");

            const ACCESS_TOKEN =
                "key=AAAAczkkdTk:APA91bG3gFEALwglHyMkFReUpOGmK38qQFCqJ1uerVqxP5buPJb33ZcWvB0LrTfmWks5hdjdlv6WujZxJO79-Frk6EdIcxKq6nCPCWDm36U8xlc2yoL6Ywt-Exo80njbSkHLO0mhV7GV";
            const pushMsg = this.pushMsg
            const data = {
                to: token,
                "notification": { //object(Notification)
                    "title": pushMsg.title, // "Тест!",
                    "body": pushMsg.text, //"Текст тестового сообщения.",
                    // "image": image
                },
                "android": { //object(AndroidConfig)
                    "priority": "HIGH", //enum(AndroidMessagePriority) NORMAL HIGH
                    "restricted_package_name": "com.example.app",
                    "data": { // Произвольная полезная нагрузка ("ключ": "значение")
                    },
                    "notification": { //object(AndroidNotification)
                        "title": (pushMsg.title + "Android"),
                        "body": (pushMsg.text + "Android"),
                        // "icon": string,
                        "color": "#ee0000",
                        "sound": "default",
                        // "click_action": '', // Действие, связанное с кликом пользователя по уведомлению
                        "notification_priority": "PRIORITY_MAX",
                    },
                    "fcm_options": { // object(AndroidFcmOptions)
                    },
                    "direct_boot_ok": true
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
                .then((text) => {
                    console.log(text)
                    alert("сообщение отправлено");
                })
                .catch((e) => console.log(e));
        },

        async addListeners() {
            await PushNotifications.addListener("registration", (token) => {
                console.info("Registration token: ", token.value);
                this.btnText = "Отправить Push";
                window.localStorage.setItem("token", token.value);
                window.localStorage.setItem("fcmSigned", "1");
                this.fcmSigned = true;
                this.token = this.$refs.textarea.value = token.value;
            });

            await PushNotifications.addListener("registrationError", (err) => {
                console.error("Registration error: ", err.error);
            });

            await PushNotifications.addListener(
                "pushNotificationReceived",
                (notification) => {
                    console.log("Push notification received: ", notification);
                    //alert("Push notification received");
                    //notification.push();
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
                    alert("Push notification action performed");
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
            const notificationList =
                await PushNotifications.getDeliveredNotifications();
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

</style>

