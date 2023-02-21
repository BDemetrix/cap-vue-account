let token = 'fcJAjyo-Q0aVTFOlX1W0I3:APA91bE_svf-3L8z2lmpxtdFCtge4Cx0lsEqstpXmI9Xnah0y2d8qWIJ_606Gv1aKJhlRp4swoFBfj5LrKeQ9AD4d7QZadhkVZjpMeRKfmUnqzSHWk9ba3UGW0ysCajp5dov_oGP1E2c';

const image = "https://cdn-icons-png.flaticon.com/512/8910/8910792.png"
const ACCESS_TOKEN =
    "key=AAAAczkkdTk:APA91bG3gFEALwglHyMkFReUpOGmK38qQFCqJ1uerVqxP5buPJb33ZcWvB0LrTfmWks5hdjdlv6WujZxJO79-Frk6EdIcxKq6nCPCWDm36U8xlc2yoL6Ywt-Exo80njbSkHLO0mhV7GV";
const data = {
    to: token,
    "notification": { //object(Notification)
        "title": "Тест!",
        "body": "Текст тестового сообщения.",
        //"image": "string"
    },
    "android": { //object(AndroidConfig)
        "priority": "HIGH", //enum(AndroidMessagePriority) NORMAL HIGH
        "restricted_package_name": "com.example.app",
        "data": { // Произвольная полезная нагрузка ("ключ": "значение")
        },
        "notification": { //object(AndroidNotification)
            "title": "Тест Android",
            "body": "Текст сообщения Android",
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

setTimeout(() => {
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
}, 5000);



// 

const fcm_msg = {
    "name": 'string', //Только вывод. Идентификатор отправленного сообщения в формате projects/*/messages/{message_id} .
    "data": { // Произвольная полезная нагрузка ("ключ": "значение")
    },
    "notification": { //object(Notification)
        "title": "Тест!",
        "body": "Текст тестового сообщения.",
        //"image": "string"
    },
    "android": { //object(AndroidConfig)
        "priority": "HIGH", //enum(AndroidMessagePriority) NORMAL HIGH
        "restricted_package_name": "com.example.app",
        "data": { // Произвольная полезная нагрузка ("ключ": "значение")
        },
        "notification": { //object(AndroidNotification)
            "title": "Тест Android",
            "body": "Текст сообщения Android",
            // "icon": string,
            "color": "#ee0000",
            "sound": "default",
            // "click_action": '', // Действие, связанное с кликом пользователя по уведомлению
            "notification_priority": "PRIORITY_MAX",
        },
        "fcm_options": { // object(AndroidFcmOptions)
        },
        "direct_boot_ok": boolean
    },
    "webpush": {
        //object(WebpushConfig)
    },
    "apns": {
        //object(ApnsConfig)
    },
    "fcm_options": {
        //object(FcmOptions)
    },

    // Union field target can be only one of the following:
    "token": "string", //
    "topic": "string", // тема (группа сообщений)
    "condition": "string"
    // End of list of possible types for union field target.
}