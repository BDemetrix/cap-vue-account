self.addEventListener("push", event => { event.waitUntil(onPush(event)) });

async function onPush(event) {
    console.log("push received", event)
    const push = event.data.json();
    console.log("push received", push)

    const { notification = {} } = { ...push };

    await self.registration.showNotification(notification.title, {
        body: notification.body,
        // icon: push.data.icon,
        icon: notification.image,
        badge: notification.image,
        requireInteraction: true,
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        //data: push.data.url,
        //data: push.data,
    })

    fetch(`/isDelivered?${push.fcmMessageId}`);
}

// Обработчик события клика по уведомлению
self.addEventListener('notificationclick', e => {
    console.log(e.notification);
    // Закрываем всплывающее окно с уведомлением
    e.notification.close();
    // Получите все клиенты Windows
    e.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {
        // Если вкладка, соответствующая целевому URL-адресу, уже существует, сфокусируйтесь на ней;
        const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === e.notification.data.url ? (windowClient.focus(), true) : false);
        // В противном случае откройте новую вкладку для соответствующего URL-адреса и сфокусируйте её.
        if (!hadWindowToFocus) clients.openWindow(e.notification.data.url).then(windowClient => windowClient ? windowClient.focus() : null);
    }));
});

self.addEventListener('install', async event => {
    const msg = '[ SW-Firebase ]:install';
    console.log(`%c${msg}`, 'border: 1px solid blue; color: blue;');
});

self.addEventListener('activate', event => {
    const msg = '[ SW-Firebase ]:activate';
    console.log(`%c${msg}`, 'border: 1px solid green; color: green');
});
