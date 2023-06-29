import { NotificationPayload } from "./types";

export const getCloseTime = (notification: NotificationPayload) => {
    if (!notification.autoClose) {
        return null;
    }
    
    return Date.now() + (notification.duration || 3000);
}