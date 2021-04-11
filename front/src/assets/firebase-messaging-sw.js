// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.3.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.3/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyCH-24Qylhfu0N8pDOBs1c5N2LyTMJz4cc",
    authDomain: "fon-hakaton21.firebaseapp.com",
    projectId: "fon-hakaton21",
    storageBucket: "fon-hakaton21.appspot.com",
    messagingSenderId: "593469376966",
    appId: "1:593469376966:web:be65649a13e7828a048ac7"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        // icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});