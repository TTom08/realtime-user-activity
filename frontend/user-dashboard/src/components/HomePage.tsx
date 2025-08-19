import React, { useState, useEffect } from "react";
import GitHubProfileCard from "./GitHubProfileCard";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface JwtPayload {
  sub: string;
}

const HomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedPayload = jwtDecode<JwtPayload>(token);
        setUsername(decodedPayload.sub);
      } catch (error) {
        console.error("Invalid token.", error);
      }
    }
  }, []);

  const welcomeMessage = username ? `Welcome, ${username}` : "Welcome";

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="flex">
      <div className="w-70 bg-gray-900/90 text-gray-200 p-6 shadow-2xl flex flex-col fixed h-full">
        <h1 className="text-2xl font-bold text-center border-b-2 border-gray-700 pb-4 mb-4 my-5">Dashboard</h1>
        <a href="#" className="block py-2 px-4 rounded-md mt-2 hover:bg-gray-700 transition-colors duration-200">Link 1</a>
        <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Link 2</a>
        <a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Link 3</a>
        <div className="mt-auto pt-4 border-t-2 border-gray-700">
          <button
            className="w-full py-3 bg-cyan-800 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col ml-70 min-h-screen overflow-y-auto">
        <div className="w-full flex justify-center py-50 shadow-inner welcome-bg">
          <h1 className="text-6xl font-extrabold text-gray-100 drop-shadow-lg">{welcomeMessage}</h1>
        </div>

        <div className="bg-white w-full h-[20vh] my-8 text-gray-700">
  <div className="w-full h-full flex flex-col lg:flex-row items-center justify-around gap-12">
    <div className="w-full flex flex-col lg:flex-row items-center justify-center mx-15">
      <p className="text-justify text-md font-bold text-gray-700">The HomePage component serves as the main dashboard for an authenticated user. It uses the useEffect hook to retrieve the JWT from localStorage and decodes it to display a personalized welcome message. The component also handles the user session by providing a logout function that removes the token and redirects the user.</p>
    </div>
    <img src="src/assets/react-logo.png" className="w-1/9 h-auto"></img>
    <div className="w-full flex flex-col lg:flex-row items-center justify-center mx-15">
      <p className="text-justify text-md font-bold text-gray-700">The HomePage component serves as the main dashboard for an authenticated user. It uses the useEffect hook to retrieve the JWT from localStorage and decodes it to display a personalized welcome message. The component also handles the user session by providing a logout function that removes the token and redirects the user.</p>
    </div>
  </div>
</div>

          <div className="w-full flex flex-col items-center p-8 dark-wallpaper">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 mt-8 mb-12">
              <div className="w-full lg:w-1/2 flex flex-col bg-gray-800/80 p-10 rounded-xl shadow-2xl transition-transform transform hover:scale-105 my-10">
                <GitHubProfileCard username="Alexa0504" />
                <div className="mt-6 border-t-2 border-gray-700 pt-6">
                  <p className="text-sm leading-relaxed text-gray-400">
                    <span className="text-base font-semibold text-gray-100">Home Page Component Description</span><br />
                    <br />
                    The HomePage component serves as the main dashboard for an authenticated user. It uses the useEffect hook to retrieve the JWT from localStorage and decodes it to display a personalized welcome message. The component also handles the user session by providing a logout function that removes the token and redirects the user. The layout is designed with a fixed sidebar and a dynamic main content area, all styled using a refined, modern dark theme with Tailwind CSS.
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col bg-gray-800/80 p-10 rounded-xl shadow-2xl transition-transform transform hover:scale-105 my-10">
                <GitHubProfileCard username="TTom08" />
                <div className="mt-6 border-t-2 border-gray-700 pt-6">
                  <p className="text-sm leading-relaxed text-gray-400">
                    <span className="text-base font-semibold text-gray-100">Login Component Description</span><br />
                    <br />
                    The Login component manages user authentication. It uses `react-hook-form` for input validation and sends a POST request to the backend with the user's credentials. Upon successful authentication, it stores the received JWT in localStorage and navigates the user to the home dashboard. This process ensures a persistent user session and allows other components to verify the user's status. Error handling is included to manage any issues during the login process.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default HomePage;