<template>
    <div class="login wrapper">
        <back-arrow @go-back="goBack"/>
        <img class="logo" src="@/assets/logo.png" alt="Логотип" />
        <h4 style="margin-bottom: 42px">Вы вошли в личный кабинет</h4>

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
        <textarea  class="textarea" rows="7" placeholder="Здесь будет токен" :value="token"></textarea>

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
//import { FirebaseMessaging } from '@capacitor-firebase/messaging';
import { mapMutations, mapGetters, mapActions} from "vuex";

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
        };
    }, 
    methods: {
        ...mapActions(['addListeners', 'registerNotifications']),
        ...mapMutations(['updateLogged', 'upFcmSigned', 'updateToken']),

        regNotifications() {
            //alert('Начало подписки')
            this.registerNotifications()
        },
        goBack() { 
            this.upFcmSigned('')
            // this.updateLogged('')
            this.updateToken('')
        },
        async sendPush() {
            let token = this.token
            // alert(token)

            if (!this.fcmSigned) {
                alert("Подписка не оформлена");
                return;
            }

            if (!token) {
                alert("Токен не найден. Возможно подписка не оформлена.");
                return;
            }

            console.log('token: ' + token);

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
                    // "priority": "HIGH", //enum(AndroidMessagePriority) NORMAL HIGH
                    // "restricted_package_name": "com.example.app",
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
                    // "direct_boot_ok": true
                },
            };

            fetch("https://fcm.googleapis.com/fcm/send", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // , *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "omit", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': ACCESS_TOKEN,
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
                    alert("сообщение отправлено")
                    // alert(JSON.stringify(text))
                })
                .catch((e) => console.log(e));
        },
    },
    computed: {
        ...mapGetters(['fcmSigned', 'token'])
    },
    mounted() {
        const savedFcmSigned = !!window.localStorage.getItem("fcmSigned")
        const curToken = window.localStorage.getItem("token")
        this.upFcmSigned(savedFcmSigned)
        this.updateToken(curToken)
        this.addListeners();
    },
};
</script>

<style scoped>

</style>

