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
import useWebSocket from "../hooks/useWebSocket"; // WebSocket hook'unu import et

const statusColors = {
  'online': 'bg-green-600',
  'idle': 'bg-yellow-600',
  'dnd': 'bg-red-600',
  'invisible': 'bg-gray-600'
};

const DiscordStatusIndicator = ({ status }) => {
  const bgColor = statusColors[status] || 'bg-gray-600';
  return (
    <div className={`w-4 h-4 rounded-full ${bgColor}`}></div>
  );
};

export default function Main() {
  const { user, github } = useData(data);

  // WebSocket'ten gelen veriyi almak için userId'yi kullan
  const discordUser = useWebSocket(User.userId);

  const [discordStatus, setDiscordStatus] = useState('online'); // Varsayılan değer 'online'

  useEffect(() => {
    if (discordUser) {
      setDiscordStatus(discordUser.discord_user?.status || 'online');
    }
  }, [discordUser]);

  return (
    <div className="mt-3 max-w-8xl w-11/12 sm:w-10/12 mx-auto">
      <title>Home | Phaelis</title>

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
              {discordUser ? (
                <img className="w-24 h-24 rounded-2xl" src={`https://cdn.discordapp.com/avatars/${discordUser.discord_user.id}/${discordUser.discord_user.avatar}.png?size=4096`} />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-primary-100 animate-pulse" />
              )}
              <div>
                {discordUser ? (
                  <h1 className="font-sans text-gray-400 font-semibold text-xl">{discordUser.discord_user.username}</h1>
                ) : (
                  <div className="bg-primary-100 animate-pulse rounded-lg w-32 h-8" />
                )}
                {discordUser ? (
                  <h2 className="font-sans text-gray-200 text-base">An experienced web developer.</h2>
                ) : (
                  <div className="w-20 h-4 bg-primary-100 rounded-lg animate-pulse mt-2" />
                )}

                <h3 className="font-sans text-white text-sm flex items-center gap-2 mt-2">
                  <DiscordStatusIndicator status={discordStatus} />
                  {discordStatus === 'dnd' ? 'Do not disturb.' : ''}
                </h3>

              </div>
            </div>
            <br />
            <div className="w-full flex justify-between items-center">
              <h1 className="font-sans text-white font-bold text-sm">{discordUser && discordUser.listening_to_spotify ? "LISTENING TO SPOTIFY" : "I AM NOT LISTENING ANYTHING."}</h1>
              <BsSpotify size="25px" className="text-green-600" />
            </div>
            <div className="flex items-center gap-4 mt-3 w-full">
              {!discordUser || !discordUser.spotify ? (
                <div className="w-24 h-24 rounded-lg bg-primary-100 animate-pulse" />
              ) : (
                <img className="w-24 h-24 rounded-lg" src={discordUser.spotify.album_art_url} />
              )}
              <div>
                {!discordUser || !discordUser.listening_to_spotify ? (
                  <div className="w- h-8 bg-primary-100 rounded-lg animate-pulse" />
                ) : (
                  <h1 className="font-semibold text-white text-base">{discordUser.spotify.song}</h1>
                )}
                {!discordUser || !discordUser.listening_to_spotify ? (
                  <div className="w-32 h-4 bg-primary-100 rounded-lg animate-pulse mt-2" />
                ) : (
                  <h2 className="text-gray-300 text-base">by {discordUser.spotify.artist}</h2>
                )}
                {!discordUser || !discordUser.listening_to_spotify ? (
                  <div className="w-8/12 h-4 bg-primary-100 rounded-lg animate-pulse mt-2" />
                ) : (
                  <h2 className="text-gray-300 text-base">on {discordUser.spotify.album}</h2>
                )}
              </div>
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
            <div className="z-50 w-full rounded-lg bg-primary-100 flex justify-between items-center relative px-4 py-3 transition duration-500 border-2 border-solid border-transparent hover:border-primary">
              <div className="flex items-center gap-4">
                {tech.icon}
              </div>
              <h1 className="font-semibold text-white font-sans text-base">{tech.name}</h1>
            </div>
          ))}
        </div>
      </div>
      <br />
      <div className="relative" data-aos="fade-right">
        <h1 className="font-sans font-semibold text-2xl text-gray-400">💎 My Github Repository</h1>
        <h2 className="font-sans text-gray-100 text-base mt-2">I share my projects with everyone.</h2>
        <div className="mt-5 w-full">
          <div className="w-full h-60 rounded-lg bg-[#111111] flex justify-center items-center">
            <div className="bg-[#1a1d22] w-full h-full rounded-lg border-2 border-gray-800 p-4">
              <h1 className="text-gray-100 text-2xl font-sans font-semibold flex items-center gap-3">My Repositories <FaRegStar size="22px" className="text-yellow-300" /></h1>
              <ul className="mt-4 flex flex-col gap-2 max-h-52 overflow-auto">
                {github.map((repo, i) => (
                  <a key={i} href={repo.html_url} className="flex justify-between items-center bg-[#1a1d22] px-3 py-2 rounded-md hover:bg-[#1a1d22]">
                    <h1 className="text-gray-100 text-sm">{repo.name}</h1>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 text-xs">{repo.stargazers_count} stars</span>
                      <BiGitRepoForked size="20px" className="text-gray-300" />
                    </div>
                  </a>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
