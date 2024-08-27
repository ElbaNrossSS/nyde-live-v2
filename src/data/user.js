import { createContext, useState, useEffect } from "react";

// WebSocket bağlantısı ve kullanıcı verilerini yöneten bir Context
export const MainContext = createContext();

export function MainProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('wss://api.lanyard.rest/socket'); // WebSocket URL'nizi buraya ekleyin

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setUser(data); // WebSocket'tan gelen verileri state'e kaydedin
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <MainContext.Provider value={{ user }}>
            {children}
        </MainContext.Provider>
    );
}
