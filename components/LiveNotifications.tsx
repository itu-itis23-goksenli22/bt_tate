"use client";

import { useEffect, useState } from "react";

interface Notification {
  id: number;
  name: string;
  action: string;
}

const names = [
  "Ahmet", "Mehmet", "Ayşe", "Fatma", "Ali", "Zeynep", "Hüseyin", "Emine",
  "Mustafa", "Hatice", "İbrahim", "Elif", "Yusuf", "Meryem", "Osman",
  "Cemile", "Hasan", "Ayşegül", "İsmail", "Derya", "Ömer", "Selin",
  "Abdullah", "Büşra", "Murat", "Gamze", "Emre", "Esra", "Serkan", "Pınar",
  "Burak", "Deniz", "Can", "Merve", "Onur", "Berat", "Seda", "Ramazan",
  "Gül", "Kemal", "Nurgül", "Recep", "Sevgi", "Erkan", "Sibel", "Yasin",
  "Dilek", "Tuncay", "Leyla", "Volkan", "Gülay", "İlhan", "Meltem", "Selim",
  "Aylin", "Barış", "Fadime", "Kadir", "Nurhan", "Orhan", "Şule", "Ufuk",
  "Yasemin", "Zafer", "Nihal", "Fikret", "Gülten", "Halil", "İlknur", "Kenan",
  "Müge", "Necati", "Özlem", "Rıza", "Şenay", "Tahir", "Ümit", "Vildan",
  "Yıldız", "Aziz", "Belma", "Cengiz", "Dilara", "Erdal", "Filiz", "Gökhan",
  "Hülya", "İlyas", "Jale", "Koray", "Leman", "Mete", "Nermin", "Okan",
  "Pelin", "Rabia", "Samet", "Tuba", "Uğur", "Vesile"
];

const action = "aylık aboneliğe katıldı";

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationId, setNotificationId] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];

      const newNotification: Notification = {
        id: notificationId,
        name: randomName,
        action: action
      };

      setNotifications(prev => [...prev, newNotification]);
      setNotificationId(prev => prev + 1);

      // Remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    };

    const scheduleNextNotification = () => {
      // Max 3 per minute: 20 seconds minimum delay
      // Realistic delays between 20-120 seconds
      const delays = [
        25000,  // 25 seconds
        30000,  // 30 seconds
        35000,  // 35 seconds
        40000,  // 40 seconds
        45000,  // 45 seconds
        50000,  // 50 seconds
        60000,  // 1 minute
        70000,  // 70 seconds
        80000,  // 80 seconds
        90000,  // 90 seconds
        100000, // 100 seconds
        120000, // 2 minutes
      ];
      const randomDelay = delays[Math.floor(Math.random() * delays.length)];

      setTimeout(() => {
        showNotification();
        scheduleNextNotification(); // Schedule next one
      }, randomDelay);
    };

    // Start the chain after initial delay (30-60 seconds)
    const initialDelay = Math.floor(Math.random() * 30000) + 30000; // 30-60 seconds
    setTimeout(() => {
      scheduleNextNotification();
    }, initialDelay);

    return () => {
      // Cleanup will happen automatically when component unmounts
    };
  }, [notificationId]);

  return (
    <div className="fixed bottom-4 left-2 md:bottom-6 md:left-6 z-50 flex flex-col gap-2 md:gap-3 pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gradient-to-r from-primary to-primary-light border border-accent/30 rounded-xl px-3 py-2.5 md:px-6 md:py-4 shadow-2xl shadow-accent/20 backdrop-blur-sm animate-slideInLeft pointer-events-auto max-w-[90vw] md:max-w-sm"
        >
          <div className="flex items-center gap-2 md:gap-4">
            {/* Avatar */}
            <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent/40 flex-shrink-0">
              <svg className="w-4 h-4 md:w-6 md:h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-xs md:text-sm truncate">
                {notification.name}
              </p>
              <p className="text-accent text-[10px] md:text-xs">
                {notification.action}
              </p>
            </div>

            {/* Check icon */}
            <div className="flex-shrink-0">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
