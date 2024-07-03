
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export const firebaseConfig = {
    apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

  export const app = initializeApp(firebaseConfig);
  let messaging
  if (typeof window !== 'undefined'){ messaging = getMessaging(app); }
  export {messaging}

 export const RequestToken =  async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Device Token for notification
      const token = await getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY });
      console.log("Token Gen", token);
    } else if (permission === "denied") {
      console.log("Denied for the notification");
    }
  }
 


  