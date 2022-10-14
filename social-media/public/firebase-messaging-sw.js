importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAnYha1sCm0LSUtUtN4jK_VpwZ1MdFrhEg",
    authDomain: "techx-e7500.firebaseapp.com",
    projectId: "techx-e7500",
    storageBucket: "techx-e7500.appspot.com",
    messagingSenderId: "480045903025",
    appId: "1:480045903025:web:0627b98b5fbabc31f88690",
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});