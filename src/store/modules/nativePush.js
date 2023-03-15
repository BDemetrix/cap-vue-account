// Для регистрации и отправки пушей отдельно для каждой платформы беза использования FirebaseMessaging
// для этой реализачанн требуется установка https://capacitorjs.com/docs/apis/push-notifications
// и удаление https://www.npmjs.com/package/@capacitor-firebase/messaging
import { PushNotifications } from "@capacitor/push-notifications"

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
                throw new Error("User denied permissions!");
            }

            PushNotifications.register();
        },
        addListeners({commit}) {
            PushNotifications.addListener("registration", (token) => {
                commit('updateToken', token.value)
                commit('upFcmSigned', true)
                // alert('Регистрация подписки: ' + token.value)
                console.log('Регистрация подписки: ' + token.value)
            });
            PushNotifications.addListener("registrationError", (err) => {
                console.error("Registration error: ", err.error);
            });
            PushNotifications.addListener(
                "pushNotificationReceived",
                (notification) => {
                    console.log("Push notification received: ", JSON.stringify(notification));
                    //alert("Push notification received");
                    notification.push();
                }
            );
            PushNotifications.addListener(
                "pushNotificationActionPerformed",
                (notification) => {
                    console.log(
                        "Push notification action performed",
                        notification.actionId,
                        notification.inputValue
                    );
                    // alert("Push notification action performed", JSON.stringify(notification));
                }
            );
        },
        async getDeliveredNotifications() {
            const notificationList =
                await PushNotifications.getDeliveredNotifications();
            console.log("delivered notifications", JSON.stringify(notificationList));
        },
    } 
}