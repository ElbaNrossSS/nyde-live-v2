import { createContext, useState, useEffect } from "react";

const MainContext = createContext();

function MainProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('wss://api.lanyard.rest/socket');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setUser(data);
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

// Varsayılan olarak bir nesne döndürüyoruz
const userData = { MainContext, MainProvider };
export default userData;
