import { useState, useEffect } from "react";

const useWebSocket = (userId) => {
  const [user, setUser] = useState(null);
  let websocket;

  useEffect(() => {
    if (!userId) return; // userId yoksa WebSocket'i başlatma

    websocket = new WebSocket("wss://api.lanyard.rest/socket");

    websocket.onmessage = (data) => {
      const message = JSON.parse(data.data);

      if (message.op === 1) {
        setInterval(() => {
          websocket.send(JSON.stringify({ op: 3 }));
        }, message.d.heartbeat_interval - 1000);
        websocket.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: [userId] } }));
      }

      if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
        setUser(message.t === "PRESENCE_UPDATE" ? message.d : message.d[userId]);
      }
    };

    return () => websocket.close(); // Temizlik
  }, [userId]);

  return user;
};

export default useWebSocket;
