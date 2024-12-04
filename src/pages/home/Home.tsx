import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
// import Footer from "../../components/footer/Footer";

import "../../index.css";

function Home() {
  const colors = [
    "#FF5733", // Red-Orange
    "#33FF57", // Lime Green
    "#5733FF", // Violet Blue
    "#FF33A1", // Hot Pink
    "#33FFF6", // Aqua
    "#FFC133", // Golden Yellow
    "#8D33FF", // Purple
    "#33FF8D", // Mint Green
    "#FF3333", // Bright Red
    "#3333FF", // Electric Blue
  ];

  const [message, setMessages] = useState("");
  const [ws, setWs] = useState(null);

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [remoteCoordinates, setRemoteCoordinates] = useState<any>([]);

  const [nameUser, setNameUser] = useState("");

  const [totalUsers, setTotalUsers] = useState<any>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://shoesndropshipping.pp.ua/wst/");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = async (e) => {
      // console.log("Received:", e.data);
      setMessages(e.data);

      try {
        const parsed = await JSON.parse(e.data);

        parsed.map((item) => {
          const { action } = item;

          switch (action) {
            case "connected":
              setNameUser(action.u_id);
              break;
            case "move_cusor":
              setTotalUsers((state) => {
                const randomColor = Math.floor(Math.random() * 10);
                const filteredState = state.filter(
                  (el) => el.u_id !== item.u_id
                );
                return [
                  ...filteredState,
                  { ...item, color: colors[randomColor] },
                ];
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

        // const fin = parsed[0].cords;

        // handleRemoteCoordinates(parsed[1]);
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
    <div className="bg-black h-screen text-white">
      <Header />
      <div className="text-center">{nameUser}</div>

      <main className="mt-16">
        <h2>Last message: {message}</h2>
        <p>
          Your coordinates: x={coordinates.x}, y={coordinates.y}
        </p>
      </main>

      {totalUsers.map((cursor: any, i) => {
        let { cords, u_id, color } = cursor;

        return (
          <div
            key={i}
            style={{
              top: cords.y,
              left: cords.x,
              width: "50px",
              height: "50px",
              backgroundColor: "" + color,
              position: "absolute",
              borderRadius: "100%",
            }}
          >
            {u_id}
          </div>
        );
      })}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
