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
  "Burak Şimşek", "Deniz Özer", "Can Acar", "Merve Ateş", "Onur Koçak"
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

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(showNotification, 5000);

    // Then show notifications every 8-15 seconds randomly
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 7000 + 8000); // Random between 8-15 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
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
