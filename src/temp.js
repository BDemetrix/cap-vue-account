let token = 'fcJAjyo-Q0aVTFOlX1W0I3:APA91bE_svf-3L8z2lmpxtdFCtge4Cx0lsEqstpXmI9Xnah0y2d8qWIJ_606Gv1aKJhlRp4swoFBfj5LrKeQ9AD4d7QZadhkVZjpMeRKfmUnqzSHWk9ba3UGW0ysCajp5dov_oGP1E2c';

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
