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
      <div className="fixed flex h-full w-70 flex-col bg-gray-900/90 p-6 text-gray-200 shadow-2xl">
        <h1 className="my-5 mb-4 border-b-2 border-gray-700 pb-4 text-center text-2xl font-bold">
          Dashboard
        </h1>
        <a
          href="#"
          className="mt-2 block rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-700"
        >
          Link 1
        </a>
        <a
          href="#"
          className="block rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-700"
        >
          Link 2
        </a>
        <a
          href="#"
          className="block rounded-md px-4 py-2 transition-colors duration-200 hover:bg-gray-700"
        >
          Link 3
        </a>
        <div className="mt-auto border-t-2 border-gray-700 pt-4">
          <button
            className="w-full rounded-lg bg-cyan-800 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-pink-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="ml-70 flex min-h-screen flex-1 flex-col overflow-y-auto">
        <div className="welcome-bg flex w-full justify-center py-50 shadow-inner">
          <h1 className="text-6xl font-extrabold text-gray-100 drop-shadow-lg">
            {welcomeMessage}
          </h1>
        </div>

        <div className="my-8 h-[20vh] w-full bg-white text-gray-700">
          <div className="flex h-full w-full flex-col items-center justify-around gap-12 lg:flex-row">
            <div className="mx-15 flex w-full flex-col items-center justify-center lg:flex-row">
              <p className="text-md text-justify font-bold text-gray-700">
                The HomePage component serves as the main dashboard for an
                authenticated user. It uses the useEffect hook to retrieve the
                JWT from localStorage and decodes it to display a personalized
                welcome message. The component also handles the user session by
                providing a logout function that removes the token and redirects
                the user.
              </p>
            </div>
            <img src="src/assets/react-logo.png" className="h-auto w-1/9"></img>
            <div className="mx-15 flex w-full flex-col items-center justify-center lg:flex-row">
              <p className="text-md text-justify font-bold text-gray-700">
                The HomePage component serves as the main dashboard for an
                authenticated user. It uses the useEffect hook to retrieve the
                JWT from localStorage and decodes it to display a personalized
                welcome message. The component also handles the user session by
                providing a logout function that removes the token and redirects
                the user.
              </p>
            </div>
          </div>
        </div>

        <div className="dark-wallpaper flex w-full flex-col items-center p-8">
          <div className="mt-8 mb-12 flex w-full max-w-7xl flex-col items-center justify-center gap-12 lg:flex-row">
            <div className="my-10 flex w-full transform flex-col rounded-xl bg-gray-800/80 p-10 shadow-2xl transition-transform hover:scale-105 lg:w-1/2">
              <GitHubProfileCard username="Alexa0504" />
              <div className="mt-6 border-t-2 border-gray-700 pt-6">
                <p className="text-sm leading-relaxed text-gray-400">
                  <span className="text-base font-semibold text-gray-100">
                    Home Page Component Description
                  </span>
                  <br />
                  <br />
                  The HomePage component serves as the main dashboard for an
                  authenticated user. It uses the useEffect hook to retrieve the
                  JWT from localStorage and decodes it to display a personalized
                  welcome message. The component also handles the user session
                  by providing a logout function that removes the token and
                  redirects the user. The layout is designed with a fixed
                  sidebar and a dynamic main content area, all styled using a
                  refined, modern dark theme with Tailwind CSS.
                </p>
              </div>
            </div>
            <div className="my-10 flex w-full transform flex-col rounded-xl bg-gray-800/80 p-10 shadow-2xl transition-transform hover:scale-105 lg:w-1/2">
              <GitHubProfileCard username="TTom08" />
              <div className="mt-6 border-t-2 border-gray-700 pt-6">
                <p className="text-sm leading-relaxed text-gray-400">
                  <span className="text-base font-semibold text-gray-100">
                    Login Component Description
                  </span>
                  <br />
                  <br />
                  The Login component manages user authentication. It uses
                  `react-hook-form` for input validation and sends a POST
                  request to the backend with the user's credentials. Upon
                  successful authentication, it stores the received JWT in
                  localStorage and navigates the user to the home dashboard.
                  This process ensures a persistent user session and allows
                  other components to verify the user's status. Error handling
                  is included to manage any issues during the login process.
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
