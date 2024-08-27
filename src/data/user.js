import { useState, useEffect } from "react";
import User from "./variables";
import useSWR from "swr";

export default function UserInformation() {
    const [user, setUser] = useState(null);
    const [github, setGithub] = useState([]);
    const [discordStatus, setDiscordStatus] = useState("Unknown"); // Discord durumunu saklamak için ekledik

    let fetchData = (url) => fetch(url).then(r => r.json());
    let { data, error } = useSWR('https://api.github.com/users/' + User.github + '/repos', fetchData, { refreshInterval: 5000 });

    useEffect(() => {
        setGithub(data);
    }, [data]);

    useEffect(() => {
        // GitHub WebSocket bağlantısı
        let githubWebSocket = new WebSocket("wss://api.lanyard.rest/socket");

        githubWebSocket.onmessage = data => {
            let message = JSON.parse(data.data);
            if (message.op) { 
                if (message.op === 1) {
                    setInterval(() => {
                        githubWebSocket.send(JSON.stringify({ op: 3 }));
                    }, message.d.heartbeat_interval - 1000);
                    githubWebSocket.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: [User.userId] } }));
                }
            }
            if (message.t && (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE")) {
                setUser((message.t === "PRESENCE_UPDATE") ? message.d : message.d[User.userId]);
            }
        };

        // Discord WebSocket bağlantısı
        let discordWebSocket = new WebSocket("wss://gateway.discord.gg");

        discordWebSocket.onopen = () => {
            discordWebSocket.send(JSON.stringify({
                op: 2,
                d: {
                    token: User.discordToken,
                    properties: {
                        $os: "linux",
                        $browser: "my_app",
                        $device: "my_app"
                    }
                }
            }));
        };

        discordWebSocket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.t === "READY") {
                console.log("Discord WebSocket connection established.");
            }
            if (message.t === "PRESENCE_UPDATE") {
                const status = message.d.status;
                setDiscordStatus(status);
            }
        };

        discordWebSocket.onclose = () => {
            console.log("Discord WebSocket connection closed.");
        };

        // Cleanup
        return () => {
            githubWebSocket.close();
            discordWebSocket.close();
        };
    }, []);

    return (
        <div>
            <h1>User Information</h1>
            <p>GitHub Repositories: {github.length}</p>
            <p>Discord Status: {discordStatus}</p>
        </div>
    );
}
