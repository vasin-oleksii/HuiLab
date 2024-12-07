import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useWebSocket = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [countUsers, setCountUsers] = useState(0);
  const [nameUser, setNameUser] = useState("");
  const [movedCursor, setMovedCursor] = useState<any[]>([]);
  const [allUsersHaveConnected, setAllUsersHaveConnected] = useState<any[]>([]);

  useEffect(() => {
    const cookie = Cookies.get("sessionId");
    const socket = new WebSocket(`${import.meta.env.VITE_WS_LINK}?t=${cookie}`);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = async (e) => {
      console.log("Received:", e.data);

      try {
        const parsed = JSON.parse(e.data);

        parsed.forEach((item: any) => {
          const { action } = item;

          switch (action) {
            case "connected":
              setNameUser(item.username);
              break;
            case "create_users_on_board":
              setAllUsersHaveConnected(item.users);
              break;
            case "move_cusor":
              setMovedCursor((state) => {
                const filteredState = state.filter(
                  (cursor) => cursor.u_id !== item.u_id
                );
                return [...filteredState, { ...item }];
              });
              break;
            case "update_total_users":
              setCountUsers(item.count);
              break;
            case "create_cusor":
              setAllUsersHaveConnected((state) => {
                delete item.action;
                return [...state, { ...item }];
              });
              break;
            case "delete_cursor":
              setAllUsersHaveConnected((state) =>
                state.filter((el) => el.u_id !== item.u_id)
              );
              break;
          }
        });
      } catch (error) {
        console.error("Failed to parse message:", error);
      }
    };

    socket.onerror = () => {
      console.error("WebSocket error");
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setWs(socket);

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const sendCursorPosition = (cords: { x: number; y: number }) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action: "move_cursor", cords }));
    }
  };

  return {
    nameUser,
    movedCursor,
    allUsersHaveConnected,
    countUsers,
    sendCursorPosition,
  };
};

export default useWebSocket;
