"use client";

import { useEffect, useState } from "react";

interface Notification {
  id: number;
  name: string;
  action: string;
}

const turkishNames = [
  "Ahmet Yılmaz", "Mehmet Demir", "Ayşe Kaya", "Fatma Çelik", "Ali Şahin",
  "Zeynep Aydın", "Hüseyin Özdemir", "Emine Arslan", "Mustafa Yıldız", "Hatice Doğan",
  "İbrahim Kara", "Elif Öztürk", "Yusuf Polat", "Meryem Aksoy", "Osman İnci",
  "Cemile Koç", "Hasan Erdoğan", "Ayşegül Güneş", "İsmail Tekin", "Derya Bulut",
  "Ömer Çetin", "Selin Kurt", "Abdullah Özkan", "Büşra Aslan", "Murat Uzun",
  "Gamze Turan", "Emre Kılıç", "Esra Demirtaş", "Serkan Yavuz", "Pınar Çalışkan",
  "Burak Şimşek", "Deniz Özer", "Can Acar", "Merve Ateş", "Onur Koçak",
  "Berat Yurt", "Seda Şen", "Ramazan Avcı", "Gül Taş", "Kemal Öz",
  "Nurgül Keskin", "Recep Kaplan", "Sevgi Yıldırım", "Erkan Yalçın", "Sibel Tok",
  "Yasin Balcı", "Dilek Karaca", "Tuncay Akyüz", "Leyla Özmen", "Volkan Sahin",
  "Gülay Yücel", "İlhan Şener", "Meltem Durmuş", "Selim Bozkurt", "Aylin Akın",
  "Barış Yaman", "Fadime Yavuz", "Kadir Özkan", "Nurhan Güler", "Orhan Çakır",
  "Şule Öztürk", "Ufuk Aydın", "Yasemin Kurt", "Zafer Koç", "Nihal Arslan",
  "Fikret Polat", "Gülten Çelik", "Halil Doğan", "İlknur Tekin", "Kenan Şahin",
  "Müge Yılmaz", "Necati Demir", "Özlem Kaya", "Rıza Özdemir", "Şenay Aksoy",
  "Tahir Erdoğan", "Ümit Güneş", "Vildan Çetin", "Yıldız Aslan", "Aziz Uzun",
  "Belma Turan", "Cengiz Kılıç", "Dilara Demirtaş", "Erdal Yavuz", "Filiz Çalışkan",
  "Gökhan Şimşek", "Hülya Özer", "İlyas Acar", "Jale Ateş", "Koray Koçak",
  "Leman Yurt", "Mete Şen", "Nermin Avcı", "Okan Taş", "Pelin Öz",
  "Rabia Keskin", "Samet Kaplan", "Tuba Yıldırım", "Uğur Yalçın", "Vesile Tok",
  "Yavuz Balcı", "Zeki Karaca", "Adem Akyüz", "Beyza Özmen", "Celal Sahin"
];

const actions = [
  "AI Scale App'e katıldı",
  "Fetih Planı'nı satın aldı",
  "yeni üye oldu",
  "programa kaydoldu"
];

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationId, setNotificationId] = useState(0);

  useEffect(() => {
    const showNotification = () => {
      const randomName = turkishNames[Math.floor(Math.random() * turkishNames.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];

      const newNotification: Notification = {
        id: notificationId,
        name: randomName,
        action: randomAction
      };

      setNotifications(prev => [...prev, newNotification]);
      setNotificationId(prev => prev + 1);

      // Remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    };

    const scheduleNextNotification = () => {
      // More realistic delays: 20-60 seconds (max 3 per minute)
      // Weighted towards longer delays for realism
      const delays = [
        20000,  // 20 seconds (common)
        25000,  // 25 seconds (common)
        30000,  // 30 seconds (common)
        35000,  // 35 seconds (common)
        40000,  // 40 seconds (less common)
        45000,  // 45 seconds (less common)
        50000,  // 50 seconds (rare)
        55000,  // 55 seconds (rare)
        60000,  // 60 seconds (rare)
        70000,  // 70 seconds (very rare)
        80000,  // 80 seconds (very rare)
        90000,  // 90 seconds (very rare)
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
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 pointer-events-none">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-gradient-to-r from-primary to-primary-light border border-accent/30 rounded-xl px-6 py-4 shadow-2xl shadow-accent/20 backdrop-blur-sm animate-slideInLeft pointer-events-auto max-w-sm"
        >
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center border-2 border-accent/40 flex-shrink-0">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">
                {notification.name}
              </p>
              <p className="text-accent text-xs">
                {notification.action}
              </p>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white/60 text-xs uppercase tracking-wider">Canlı</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
