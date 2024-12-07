import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Cookies from "js-cookie";

import "../../index.css";
import { GiArrowCursor } from "react-icons/gi";
import Header from "../../components/header/Header";

function Home() {
  const [ws, setWs] = useState(null);
  const [countUsers, setCountUsers] = useState(0);

  const [nameUser, setNameUser] = useState("");
  const [movedCursor, setMovedCursor] = useState<any>([]);
  const [allUsersHaveConnected, setAllUsersHaveConnected] = useState<any>([]);

  useEffect(() => {
    const cookie = Cookies.get("sessionId");
    const socket = new WebSocket(`${import.meta.env.VITE_WS_LINK}?t=${cookie}`);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = async (e) => {
      console.log("Received:", e.data);

      try {
        const parsed = await JSON.parse(e.data);

        parsed.map((item: any) => {
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
              // setMovedCursor(item);

              break;
            case "update_total_users":
              setCountUsers(item.count);
              break;
            case "create_cusor":
              console.log(item);
              setAllUsersHaveConnected((state) => {
                delete item.action;
                console.log("item", item);
                return [...state, { ...item }];
              });
              break;
            case "delete_cursor":
              setAllUsersHaveConnected((state) => {
                const filteredState = state.filter(
                  (el) => el.u_id !== item.u_id
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
    <>
      <Header />

      <div className="bg-blackBg  h-screen text-white">
        <main className="h-5/6">
          <h1 className="text-4xl">Hello user: {nameUser}</h1>
        </main>

        {movedCursor.map((cursor: any) => {
          let { cords, u_id } = cursor;

          const filtered = allUsersHaveConnected.filter(
            (user) => user.u_id === u_id
          );
          if (filtered[0] === undefined) {
            return;
          }

          const { color, username } = filtered[0];

          // console.log("cursor", cursor.u_id);
          // console.log("allUsersFirstConnection", allUsersFirstConnection);
          // console.log("allUsersFirstConnection", allUsersFirstConnection.u_id);

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
              <div className={`ml-5 text-${color}`}>{username}</div>
            </div>
          );
        })}
        <Footer allUsersNum={countUsers} />
      </div>
    </>
  );
}

export default Home;
