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
    <div className="bg-radial-gradient-colors flex">
      <div className="fixed flex h-full w-70 flex-col bg-gray-800/70 p-4 text-gray-200 shadow-xl/100">
        <h1 className="text-center text-2xl font-bold">Dashboard</h1>
        <a href="#" className="mt-4 block p-2 hover:bg-gray-700">
          Link 1
        </a>
        <a href="#" className="block p-2 hover:bg-gray-700">
          Link 2
        </a>
        <a href="#" className="block p-2 hover:bg-gray-700">
          Link 3
        </a>
        <div className="mt-auto">
          <button
            className="w-full rounded-md bg-red-600/50 py-2 font-semibold text-gray-200 hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="ml-70 flex min-h-screen flex-1 flex-col items-center justify-start overflow-y-auto">
        <h1 className="p-8 text-7xl font-bold text-gray-200">
          {welcomeMessage}
        </h1>
        <div className="mt-8 flex w-full flex-wrap items-center justify-evenly">
          <div className="mb-8 flex h-250 w-120 flex-col items-center justify-start bg-gray-800/70 p-24 text-gray-400">
            <GitHubProfileCard username="Alexa0504" />
            <div className="mt-4">
              <p className="text-sm leading-relaxed">
                <span className="text-base font-semibold text-gray-200">
                  Home Page Component Description 🏠
                </span>
                <br />
                The HomePage component serves as the main dashboard for an
                authenticated user. It's responsible for personalizing the
                user's experience by displaying a welcome message with their
                username. It achieves this by using the useEffect hook to
                retrieve the JWT from localStorage on component mount. The token
                is then decoded using jwt-decode to extract the username from
                the sub claim. The component also includes a handleLogout
                function, which removes the token from localStorage and
                redirects the user to the login page, effectively ending their
                session. The layout is a two-column design with a static sidebar
                and a dynamic main content area that can display various
                information, such as GitHub profile cards. The page is styled
                using Tailwind CSS for a modern, responsive design.
              </p>
            </div>
          </div>
          <div className="mb-8 flex h-250 w-120 flex-col items-center justify-start bg-gray-800/70 p-24 text-gray-400">
            <GitHubProfileCard username="TTom08" />
            <div className="mt-4">
              <p className="text-sm leading-relaxed">
                <span className="text-base font-semibold text-gray-200">
                  Login Component Description 🔐
                </span>
                <br />
                The Login component handles user authentication. It uses
                react-hook-form to manage the login form and validate user
                input. When the form is submitted, the component sends a POST
                request to the backend API with the user's credentials. If the
                authentication is successful, the component stores the received
                JWT (JSON Web Token) in localStorage under the key authToken and
                navigates the user to the /home route. This process ensures that
                the user's session is persisted across page loads and allows
                other components, like HomePage, to verify their authenticated
                status. Error handling is included to catch and log any issues
                during the authentication process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
