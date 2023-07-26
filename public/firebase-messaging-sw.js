// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyADGaR3vbV1GXmTaT9mF-Y9NEPf5TgJf6c',
  authDomain: 'happywork-555b3.firebaseapp.com',
  projectId: 'happywork-555b3',
  storageBucket: 'happywork-555b3.appspot.com',
  messagingSenderId: '39970346603',
  appId: '1:39970346603:web:96d773abb5a43cbc02832e',
  measurementId: 'G-4DF7BX9YJS',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
