import { useEffect } from "react";
import Footer from "../../components/footer/Footer";

import "../../index.css";
import { GiArrowCursor } from "react-icons/gi";
import Header from "../../components/header/Header";
import useWebSocket from "../../shared/hooks/useWebSocket";

function Home() {
  const {
    nameUser,
    movedCursor,
    allUsersHaveConnected,
    countUsers,
    sendCursorPosition,
  } = useWebSocket();

  useEffect(() => {
    let lastExecution = 0;
    const throttleInterval = 100;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastExecution >= throttleInterval) {
        sendCursorPosition({ x: e.clientX, y: e.clientY });
        lastExecution = now;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sendCursorPosition]);

  return (
    <>
      <Header />

      <div className="bg-blackBg h-screen text-white">
        <main className="h-5/6">
          <h1 className="text-4xl">Hello user: {nameUser}</h1>
        </main>

        {movedCursor.map((cursor: any) => {
          const { cords, u_id } = cursor;

          const filtered = allUsersHaveConnected.filter(
            (user) => user.u_id === u_id
          );

          if (filtered[0] === undefined) {
            return null;
          }

          const { color, username } = filtered[0];
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
