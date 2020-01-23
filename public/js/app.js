const messaging =firebase.messaging();
messaging.usePublicVapidKey('BHOIgWIJrSWYaXWL6p0EFy0i_FseDxTQFBFGKZzseSCKhBd0Auq5pnbQcIWQ8Y6RZ6fb1bRO33GfxY3rFQqrJ9M');
const notificationButton = document.getElementById("enableNotifications");
let swRegistration = null;

initializeApp();

function initializeApp() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');
  
      //Register the service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then(swReg => {
          console.log('Service Worker is registered', swReg);
          // We are storing the service worker, globally
          swRegistration = swReg;
        })
        .catch(error => {
          console.error('Service Worker Error', error);
        });
    } else {
      console.warn('Push messaging is not supported');
      notificationButton.textContent = 'Push Not Supported';
    }
  }


  messaging.requestPermission()
  .then(function(){
    console.log('Have Permission');
    return messaging.getToken();
  })
   .then(function(token){
     console.log(token);
   })
  .catch(function(err)
  {
    console.log('Error Occured');
  })

  messaging.onMessage(function(payload) {
    alert('Notification recieved!');
    swRegistration.showNotification("PWA noti","HYD");
});