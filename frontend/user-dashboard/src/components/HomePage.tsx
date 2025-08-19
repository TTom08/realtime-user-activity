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
    <div className="flex bg-radial-gradient-colors">
      <div className="w-70 bg-gray-800/70 text-gray-200 p-4 shadow-xl/100 flex flex-col fixed h-full">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <a href="#" className="block p-2 mt-4 hover:bg-gray-700">Link 1</a>
        <a href="#" className="block p-2 hover:bg-gray-700">Link 2</a>
        <a href="#" className="block p-2 hover:bg-gray-700">Link 3</a>
        <div className="mt-auto">
          <button
            className="w-full py-2 bg-red-600/50 hover:bg-red-700 text-gray-200 font-semibold rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-start ml-70 min-h-screen overflow-y-auto">
        <h1 className="text-7xl font-bold p-8 text-gray-200">{welcomeMessage}</h1>
        <div className="flex mt-8 items-center justify-evenly flex-wrap w-full">
          <div className="flex flex-col items-center justify-start text-gray-400 bg-gray-800/70 p-24 h-250 w-120 mb-8">
            <GitHubProfileCard username="Alexa0504" />
            <div className="mt-4">
              <p className="text-sm leading-relaxed">
                <span className="text-base font-semibold text-gray-200">Home Page Component Description 🏠</span><br />
                The HomePage component serves as the main dashboard for an authenticated user. It's responsible for personalizing the user's experience by displaying a welcome message with their username. It achieves this by using the useEffect hook to retrieve the JWT from localStorage on component mount. The token is then decoded using jwt-decode to extract the username from the sub claim. The component also includes a handleLogout function, which removes the token from localStorage and redirects the user to the login page, effectively ending their session. The layout is a two-column design with a static sidebar and a dynamic main content area that can display various information, such as GitHub profile cards. The page is styled using Tailwind CSS for a modern, responsive design.
              </p>
            </div>
          </div>
            <div className="flex flex-col items-center justify-start text-gray-400 bg-gray-800/70 p-24 h-250 w-120 mb-8">
            <GitHubProfileCard username="TTom08" />
            <div className="mt-4">
              <p className="text-sm leading-relaxed">
                <span className="text-base font-semibold text-gray-200">Login Component Description 🔐</span><br />
                The Login component handles user authentication. It uses react-hook-form to manage the login form and validate user input. When the form is submitted, the component sends a POST request to the backend API with the user's credentials. If the authentication is successful, the component stores the received JWT (JSON Web Token) in localStorage under the key authToken and navigates the user to the /home route. This process ensures that the user's session is persisted across page loads and allows other components, like HomePage, to verify their authenticated status. Error handling is included to catch and log any issues during the authentication process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;