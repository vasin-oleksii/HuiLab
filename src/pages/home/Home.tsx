import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import "../../index.css";
import { GiArrowCursor } from "react-icons/gi";

function Home() {
  const [message, setMessages] = useState("");
  const [ws, setWs] = useState(null);

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const [nameUser, setNameUser] = useState("");

  const [totalUsers, setTotalUsers] = useState<any>([]);

  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_WS_LINK);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = async (e) => {
      console.log("Received:", e.data);
      setMessages(e.data);

      try {
        const parsed = await JSON.parse(e.data);

        parsed.map((item) => {
          const { action } = item;
          console.log(item);
          switch (action) {
            case "connected":
              setNameUser(action.u_id);
              break;
            case "move_cusor":
              setTotalUsers((state) => {
                const filteredState = state.filter(
                  (el) => el.u_id !== item.u_id
                );

                return [...filteredState, { ...item }];
              });
              break;
            case "delete_cursor":
              setTotalUsers((state) => {
                const filteredState = state.filter(
                  (el) => el.u_id === item.u_id
                );
                return [...filteredState];
              });
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

  useEffect(() => {
    if (!ws) return;

    const handleMouseMove = (e) => {
      const newCoordinates = { x: e.clientX, y: e.clientY };
      setCoordinates(newCoordinates);

      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            action: "move_cursor",
            cords: { x: e.clientX, y: e.clientY },
          })
        );
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ws]);

  return (
    <div className="bg-blackBg  h-screen text-white">
      <Header />
      <div className="text-center">{nameUser}</div>

      <main className="h-5/6">
        <h2>Last message: {message}</h2>
        <p>
          Your coordinates: x={coordinates.x}, y={coordinates.y}
        </p>
      </main>

      {totalUsers.map((cursor: any) => {
        let { cords, u_id, color } = cursor;

        return (
          <div
            key={u_id}
            style={{
              top: cords.y,
              left: cords.x,
              color: "" + color,
              position: "absolute",
              borderRadius: "100%",
            }}
            className="text-2xl drop-shadow-2xl shadow-white"
          >
            <GiArrowCursor />
          </div>
        );
      })}
      <Footer />
    </div>
  );
}

export default Home;
