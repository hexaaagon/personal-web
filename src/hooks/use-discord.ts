import { LanyardWebsocket } from "@/lib/lanyard";
import { ExtendedLanyardData } from "@/types/lanyard";
import { useEffect, useState, useRef } from "react";

export function useDiscord() {
  const [data, setData] = useState<ExtendedLanyardData>();
  const [loading, setLoading] = useState(true);
  const socketRef = useRef<LanyardWebsocket | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isPageVisibleRef = useRef(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPageVisibleRef.current = false;

        timeoutRef.current = setTimeout(() => {
          if (!isPageVisibleRef.current) {
            closeSocket();
          }
        }, 60000);
      } else {
        isPageVisibleRef.current = true;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }

        if (!socketRef.current) {
          setLoading(true);
          initializeSocket();
        }
      }
    };

    const initializeSocket = () => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.close();
      }

      const socket = new LanyardWebsocket({
        userId: "465454937267240962",
      });

      socket.on("update", (data: ExtendedLanyardData) => {
        setData(data);
        setLoading(false);
      });

      socketRef.current = socket;
    };

    const closeSocket = () => {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.close();
        socketRef.current = null;
      }
    };

    initializeSocket();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      closeSocket();
    };
  }, []);

  return { data, loading };
}
