
  let notificationUrl = '';
  
  self.addEventListener("push", function(event) {


    let data = event.data ? JSON.parse(event.data.text()) : {};
    notificationUrl = data.redirecturl;
       
    if (event.data) {

        return self.registration.showNotification(data.title, {
            body: data.message,
            icon:"https://raw.githubusercontent.com/TSG-Website/media/master/Logos/tsg_logo.png",
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            image:data.imageurl,
          });
    } else {
      console.log("Push event but no data");
    }
  });

  self.addEventListener('notificationclick', function(event) {
    let url = notificationUrl;
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
    
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
               
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
          
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
