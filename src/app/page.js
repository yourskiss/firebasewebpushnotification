"use client"
import { useEffect, useState } from 'react';
import { RequestToken } from './firebase-init';
 
export default function Home() {
 
  useEffect(() => {
    RequestToken();
  }, []);

  return (
    <div>
     <h1>test</h1>
    </div>
  );
}
