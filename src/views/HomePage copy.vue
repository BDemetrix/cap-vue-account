<template>
    <div class="login wrapper">
        <img class="logo" src="@/assets/logo.png" alt="Логотип" />
        <h4 style="margin-bottom: 42px">Вы вошли в личный кабинет</h4>

        <button class="btn" type="button" @click="sendPush">
            {{ btnText }}
        </button>
        <button class="btn" type="button" @click="unSubscribe" v-if="fcmSigned">
            Отписаться
        </button>
    </div>
</template>

<script>

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, deleteToken } from "firebase/messaging";

// const fb = initializeApp(firebaseConfig);
/* const PUBLIC_VAPID_KEY = "BP18qEecjZuO4Yi_xtG6jlmqk7EHGCqpc46zH6cuanWlqL7nXpKyfPJmmToFqdxD55rENrF_STkXjoX4U4KOxJw"; */

export default {
    name: "HomePage",
    data() {
        return {
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
        async sendPush() {
            const permission = await Notification.requestPermission();
            if (permission == "denied") {
                console.log("user denied notifications");
                alert(
                    " В вашем браузере включен запрет на отправку вам push-ведомлений с данного ресурса. \n\n  Если вы хотите получать push-уведомления с данного сайта, пожалуйста, измените это в настройках браузера."
                );
                return;
            }

            //const errMsg = "Подписка не удалась. Обратитесь в службу поддержки.";
            const messaging = await getMessaging();
            const token = await getToken(messaging, {
                vapidKey: this.PUBLIC_VAPID_KEY,
            });
            console.log(token);
            window.localStorage.setItem("fcmSigned", "1");
            this.fcmSigned = true;
            this.btnText = this.fcmSigned
                ? "Отправить Push"
                : "Подписаться на Push";

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
                    icon: "https://cdn-icons-png.flaticon.com/512/8910/8910792.png",
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
                .then((text) => console.log(text))
                .catch((e) => console.log(e));
        },
        async unSubscribe() {
            const messaging = await getMessaging();
            const token = await deleteToken(messaging);
            console.log(token);
            window.localStorage.setItem("fcmSigned", "");
            this.fcmSigned = false;
            this.btnText = this.fcmSigned
                ? "Отправить Push"
                : "Подписаться на Push";
        },
    },
    mounted() {
        this.btnText = this.fcmSigned
            ? "Отправить Push"
            : "Подписаться на Push";
    },
};
</script>

<style>
</style>

