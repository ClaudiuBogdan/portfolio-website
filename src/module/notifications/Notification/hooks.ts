import { useEffect, useState } from "react";

export const useNotificationLifecycle = (
  onClose: () => void,
  mounted: boolean,
  hide?: boolean
) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (mounted) {
      setShow(true);
    }
  }, [mounted]);

  useEffect(() => {
    const animationDuration = 300;
    if (hide) {
      setShow(false);
      const timeout = setTimeout(() => {
        onClose();
      }, animationDuration);
      return () => clearTimeout(timeout);
    }
  }, [hide, onClose]);

  return show;
};
