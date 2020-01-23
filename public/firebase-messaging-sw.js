// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// // Initialize Firebase
// var firebaseConfig = {
//     messagingSenderId: "810001041984",
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//  const messaging = firebase.messaging();
// // messaging.setBackgroundMessageHandler(function (payload) {
// //   console.log('Handling background message ', payload);

//   var obj= JSON.parse(payload.data.notification);
//   var notificationTitle=obj.title;
//   var notificationOptions={
//     body:obj.body,
//     icon:obj.icon
//   };
//   return self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   event.waitUntil(self.clients.openWindow(event.notification.data));
// });