"use client"
import { useEffect } from 'react';
import { RequestToken } from './firebase-init';
 
export default function Home() {
 
 

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js', { scope: '/' })
        .then((registration) => { RequestToken(); console.log('scope is: ', registration.scope); })
        .catch((error) => {console.error('Service worker registration failed:', error); });
    }

    
  }, []);
  

  return (
    <div>
     <h1>test</h1>
    </div>
  );
}
