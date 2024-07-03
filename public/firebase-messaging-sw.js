// File: firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyBLnmGOHSGiiYVV_rEiGk6QZdGccoMB5GE",
  authDomain: "kerakollclub.firebaseapp.com",
  projectId: "kerakollclub",
  storageBucket: "kerakollclub.appspot.com",
  messagingSenderId: "461938643762",
  appId: "1:461938643762:web:d743846ce4b8024ff9bd2b"
};


// Set Firebase configuration, once available
self.addEventListener('fetch', () => {
  try {
    const urlParams = new URLSearchParams(location.search);
    self.firebaseConfig = Object.fromEntries(urlParams);
  } catch (err) {
    console.error('Failed to add event listener', err);
  }
});

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};
// Initialize Firebase app
firebase.initializeApp(self.firebaseConfig || defaultConfig);
let messaging;
try {
   messaging = firebase.messaging.isSupported() ? firebase.messaging() : null
} catch (err) {
  console.error('Failed to initialize Firebase Messaging', err);
}

// To dispaly background notifications
if (messaging) {
  try {
    messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = { 
      body: payload.notification.body,
      tag: notificationTitle, // tag is added to ovverride the notification with latest update
      data: {
        url: payload?.data?.openUrl,// This should contain the URL you want to open
      },
      icon: payload.notification?.image,
    }
    // Optional
       /*
        * This condition is added because notification triggers from firebase messaging console doesn't handle image by default.
        * collapseKey comes only when the notification is triggered from firebase messaging console and not from hitting fcm google api.
        */
        if (payload?.collapseKey && payload?.notification?.image) {
          self.registration.showNotification(notificationTitle, notificationOptions);
        } else {
           // Skipping the event handling for notification
           return new Promise(function(resolve, reject) {});
        }
    });
  } catch (err) {
    console.log(err);
  }
}