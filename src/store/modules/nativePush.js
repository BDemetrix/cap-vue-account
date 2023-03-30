// Для регистрации и отправки пушей отдельно для каждой платформы беза использования FirebaseMessaging
// для этой реализачанн требуется установка https://capacitorjs.com/docs/apis/push-notifications
// и удаление https://www.npmjs.com/package/@capacitor-firebase/messaging
import {
    PushNotifications
} from "@capacitor/push-notifications"
import router from '@/router/router'

export default {
    state() {
        return {
            fcmSigned: false,
            token: '',
        }
    },
    getters: {
        fcmSigned(state) {
            return state.fcmSigned
        },
        token(state) {
            return state.token
        }
    },
    mutations: {
        upFcmSigned(state, fcmSigned) {
            state.fcmSigned = fcmSigned
            window.localStorage.setItem("fcmSigned", fcmSigned);
        },
        updateToken(state, token) {
            state.token = token
            window.localStorage.setItem('token', token)
        }
    },
    actions: {
        async registerNotifications() {
            let permStatus = await PushNotifications.checkPermissions();
            // alert('Получение разрешения подписки: ' + permStatus.receive)

            if (permStatus.receive === "prompt") {
                permStatus = await PushNotifications.requestPermissions();
            }

            if (permStatus.receive !== "granted") {
                alert('Push-уведомления для этого устройства запрещены. Пожалуйста измените настройки!')
                throw new Error("User denied permissions!");
            }

            PushNotifications.register();
        },
        addListeners({
            commit
        }) {
            PushNotifications.addListener("registration", (token) => {
                commit('updateToken', token.value)
                commit('upFcmSigned', true)
                // alert('Регистрация подписки: ' + token.value)
                console.log('Регистрация подписки: ' + token.value)
            });
            PushNotifications.addListener("registrationError", (err) => {
                alert('Ошибка регистрации приложения в службе Push-уведомлений')
                console.error("Registration error: ", err.error);
            });
            PushNotifications.addListener(
                "pushNotificationReceived",
                async (notification) => {
                    console.log("Push notification received: ", JSON.stringify(notification));
                    //alert("Push notification received" + JSON.stringify(notification));
                    // notification.push();
                    commit('updateLogged', '1');
                    commit('setMsg', notification);
                    router.push({
                        path: '/msg'
                    })
                }
            );
            PushNotifications.addListener(
                "pushNotificationActionPerformed",
                async (notification) => {
                    const data = notification.notification.data
                    console.log("Push notification action performed", JSON.stringify(notification));

                    if (data.title) {
                        commit('setMsg', data);
                        commit('updateLogged', '1');
                        router.push({ path: '/msg' })
                        // alert(JSON.stringify(notification))
                    }
                }
            );
        },
        async getDeliveredNotifications() {
            const notificationList =
                await PushNotifications.getDeliveredNotifications();
            console.log("delivered notifications", JSON.stringify(notificationList));
        },
    }


    /* {
        "actionId": "tap",
        "notification": {
            "id": "0:1680192434178669%3f96d2733f96d273",
            "data": {
                "google.delivered_priority": "high",
                "google.sent_time": "1680192402562",
                "google.ttl": "2419200",
                "google.original_priority": "high",
                "from": "494879929657",
                "gcm.n.analytics_data": "Bundle[mParcelledData.dataSize=356]",
                "collapse_key": "com.CapVueAcc.app"
            }
        }
    } */
}