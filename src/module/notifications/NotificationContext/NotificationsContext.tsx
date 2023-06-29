import React, {
  createContext,
  useCallback,
  useContext,
} from "react";
import { Notification } from "../Notification/Notification";
import { NotificationData, NotificationPayload } from "./types";
import { getCloseTime } from "./utils";
import { useNotificationsLifecycle } from "./hooks";

interface NotificationContextType {
  addNotification: (notification: NotificationPayload) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  addNotification: () => void 0,
});

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useNotificationsLifecycle();


  const addNotification = useCallback(
    (notificationPayload: NotificationPayload) => {
      const notificationId = `${Date.now()}-${Math.random().toFixed(5)}}`; // id should be unique
      const closeAt = getCloseTime(notificationPayload)
      const notification: NotificationData = {
        ...notificationPayload,
        id: notificationId,
        closeAt,
      };
      setNotifications((notifications) => notifications.concat(notification));
    },
    [setNotifications]
  );

  const handleNotificationClose = (notificationId: string) => {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.id !== notificationId)
    );
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
            notification={notification}
          onClose={() => handleNotificationClose(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};
