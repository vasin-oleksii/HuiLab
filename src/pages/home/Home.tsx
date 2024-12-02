import { useEffect, useState } from "react";

function Home() {
  const [message, setMessages] = useState("");
  const [ws, setWs] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [remoteCoordinates, setRemoteCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const socket = new WebSocket("ws://shoesndropshipping.pp.ua/ws/");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    const handleRemoteCoordinates = (x, y) => {
      setRemoteCoordinates({ x: x, y: y });
    };

    socket.onmessage = async (e) => {
      console.log("Received:", e.data);
      setMessages(e.data);
      try {
        const parsed = await JSON.parse(e.data);

        const fin = parsed[0].cords;
        handleRemoteCoordinates(fin.x, fin.y);
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
    <>
      <h1>Hello from HuiLab</h1>
      <h2>Last message: {message}</h2>
      <p>
        Your coordinates: x={coordinates.x}, y={coordinates.y}
      </p>
      <div
        style={{
          top: remoteCoordinates.y,
          left: remoteCoordinates.x,
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          position: "absolute",
        }}
      ></div>
    </>
  );
}

export default Home;
