import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSpotify, BsArrowRight } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi";

/* DATA */
import { MainContext as data, useContext as useData } from "../context/userData";
import User from "../data/variables.js";
import Technologies from "../data/technologies";
import Colors from "../style/githubLangColors";
import about from "../data/variables.js";

export default function Main() {
    const { user, github } = useData(data);
    const [discordStatus, setDiscordStatus] = useState("offline");
    const [activity, setActivity] = useState(null);

    useEffect(() => {
        const fetchDiscordStatus = async () => {
            try {
                const response = await fetch(`https://api.lanyard.rest/v1/users/1045401575348256858`);
                const data = await response.json();
                console.log("API Response:", data); // Log the response to inspect its structure
                if (data && data.data) {
                    setDiscordStatus(data.data.discord_status);
                    if (data.data.activities && data.data.activities.length > 0) {
                        setActivity(data.data.activities[0]); // Get the first activity
                    } else {
                        setActivity(null);
                    }
                }
            } catch (error) {
                console.error('Error fetching Discord status:', error);
                setDiscordStatus("offline"); // Hata durumunda 'offline' olarak ayarla
                setActivity(null); // Hata durumunda aktiviteyi boş yap
            }
        };
    
        fetchDiscordStatus();
        const intervalId = setInterval(fetchDiscordStatus, 10000); // 10 saniyede bir günceller
    
        return () => clearInterval(intervalId); // Bileşen unmount olduğunda interval'ı temizle
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'online':
                return 'bg-green-500';
            case 'idle':
                return 'bg-yellow-500';
            case 'dnd':
                return 'bg-red-600';
            case 'invisible':
                return 'bg-gray-500';
            case 'offline':
                return 'bg-gray-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="mt-3 max-w-8xl w-11/12 sm:w-10/12 mx-auto">
            <title>Home | Barış</title>

            <div className="space-y-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 sm:space-y-0">
                <div className="mt-6" data-aos="fade-right">
                    <h1 className="font-sans font-semibold text-gray-400 text-2xl flex items-center gap-1">
                        <span className="text-4xl"> 👋</span> Hello! Let me introduce myself.
                    </h1>
                    <h2 className="font-sans text-base text-gray-200 mt-2">{User.description}</h2>
                    <div className="flex items-center gap-3 mt-4">
                        <Link to="/about">
                            <button className="bg-gray-600 rounded-md text-base text-white font-sans px-5 py-3 flex items-center gap-2 transition duration-300 hover:bg-gray-800">
                                I want to learn about you <BsArrowRight size="22px" />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-full sm:w-9/12 sm:order-2" align="center" data-aos="fade-left">
                    <div className="skew-y-0 sm:skew-y-6 bg-[#111111] w-full sm:w-96 h-72 rounded-lg relative py-5 px-4 overflow-hidden mt-8" align="left">
                        <div className="flex items-center gap-3 w-full">
                            {user ? (
                                <img className="w-24 h-24 rounded-2xl" src={`https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.png?size=4096`} />
                            ) : (
                                <div className="w-24 h-24 rounded-2xl bg-primary-100 animate-pulse" />
                            )}
                            <div>
                                {user ? (
                                    <h1 className="font-sans text-gray-400 font-semibold text-xl">{user.discord_user.username}</h1>
                                ) : (
                                    <div className="bg-primary-100 animate-pulse rounded-lg w-32 h-8"></div>
                                )}
                                {user ? (
                                    <h2 className="font-sans text-gray-200 text-base">An experienced web developer.</h2>
                                ) : (
                                    <div className="w-20 h-4 bg-primary-100 rounded-lg animate-pulse mt-2"></div>
                                )}
                                <h3 className="font-sans text-white text-sm flex items-center gap-2 mt-2">
                                    <div className={`w-4 h-4 rounded-full ${getStatusColor(discordStatus)}`}></div>
                                    {discordStatus === 'online' && 'Online'}
                                    {discordStatus === 'idle' && 'Idle'}
                                    {discordStatus === 'dnd' && 'Do not disturb'}
                                    {discordStatus === 'invisible' && 'Invisible'}
                                    {discordStatus === 'offline' && 'Offline'}
                                </h3>
                            </div>
                        </div>
                        <br />
                        <div className="w-full flex justify-between items-center">
                            <h1 className="font-sans text-white font-bold text-sm">
                                {activity ? "CURRENT ACTIVITY" : "NOTHING IS HAPPENING."}
                            </h1>
                        </div>
                        


                        
                        <div className="flex items-center gap-4 mt-3 w-full">
  {!activity ? (
    <div className="w-24 h-24 rounded-lg bg-primary-100 animate-pulse"></div>
  ) : (
    <>
      {activity.assets && activity.assets.large_image ? (
        <div className="w-24 h-24">
          <img
            src={`https://i.scdn.co/image/${activity.assets.large_image.split(':')[1]}`}  // Spotify image URL
            className="w-full h-full object-cover rounded-lg"
            alt="Activity Image"
            onError={(e) => { e.currentTarget.style.display = 'none'; }} // Hata durumunda resmi gizler
          />
        </div>
      ) : null}  {/* Resim yoksa bu div tamamen kaldırılır */}

      <div className={`flex flex-col ${!activity.assets || !activity.assets.large_image ? 'ml-0' : 'ml-4'}`}>
        <h1 className="font-semibold text-white text-base">{activity.details}</h1>
        <h2 className="text-gray-300 text-base">{activity.state}</h2>
      </div>
    </>
  )}
</div>








                    </div>
                </div>
            </div>
            <br /><br />
            <div data-aos="fade-right">
                <h1 className="font-sans font-semibold text-2xl text-gray-400 mt-12">👨‍💻 Technologies I Use</h1>
                <h2 className="font-sans text-gray-100 text-base mt-2">List of technologies I can use.</h2>
                <div className="mt-5 w-full grid grid-cols-1 gap-4 grid-flow-row auto-rows-max px-3 sm:px-0 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {Technologies.data.map(tech => (
                        <div key={tech.name} className="z-50 w-full rounded-lg bg-primary-100 flex justify-between items-center relative px-4 py-3 transition duration-500 border-2 border-solid border-transparent hover:border-primary">
                            <div className="flex items-center gap-4">
                                {tech.icon}
                            </div>
                            <h1 className="font-semibold text-white font-sans text-base">{tech.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
            <br /><br />
            <div data-aos="fade-right">
                <h1 className="font-sans font-semibold text-2xl text-gray-400 mt-6">📖 Github Repositories</h1>
                <h2 className="font-sans text-gray-100 text-base mt-2">I have {github?.length || 0} repositories now. You can support me by starring!</h2>
                <div className="mt-5 w-full grid grid-cols-1 gap-2 grid-flow-row auto-rows-max px-3 sm:px-0 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                    {github ? github.map(data => (
                        <div key={data.name} className="w-full rounded-lg bg-primary-100 flex justify-between items-center relative px-4 py-3 transition duration-500 border-2 border-solid border-transparent hover:border-primary">
                            <div className="flex items-center gap-4">
                                <FaRegStar className="text-yellow-400" />
                                <h1 className="font-semibold text-white font-sans text-base">{data.name}</h1>
                            </div>
                            <div className="flex items-center gap-4">
                                <a href={data.html_url} className="text-gray-300 hover:text-gray-100">View</a>
                                <a href={data.html_url} className="text-gray-300 hover:text-gray-100">
                                    <BsArrowRight size="22px" />
                                </a>
                            </div>
                        </div>
                    )) : (
                        <div className="w-full flex justify-center items-center">
                            <div className="w-24 h-24 rounded-lg bg-primary-100 animate-pulse"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
