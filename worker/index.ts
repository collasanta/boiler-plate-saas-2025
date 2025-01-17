declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", function (event) {
  const data = event?.data!.json();
  const options = {
    body: data.body,
    icon: data.icon,
    vibrate: [100, 50, 100],
    data: {
      subscriptionId: data.data.subscriptionId
    }
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
  if (navigator.setAppBadge) {
    navigator.setAppBadge(1);
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const saveDB = fetch('/api/notifications/track-open', {
    method: 'POST',
    body: JSON.stringify({ subscriptionId: event.notification.data.subscriptionId }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return self.clients.openWindow("/");
      })
  );
});

self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  self.clients.claim();
});


export { };