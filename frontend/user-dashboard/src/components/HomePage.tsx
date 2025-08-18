// src/components/HomePage.tsx
import React, { useState, useEffect } from "react";
import GitHubProfileCard from "./GitHubProfileCard";
import { jwtDecode } from "jwt-decode";


interface JwtPayload {
  sub: string;
}

const HomePage = () => {
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

  return (
    <div className="flex flex-row h-screen bg-radial-gradient-colors">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800/70 text-gray-200 p-4 shadow-xl/100 flex flex-col">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <a href="#" className="block p-2 mt-4 hover:bg-gray-700">Link 1</a>
        <a href="#" className="block p-2 hover:bg-gray-700">Link 2</a>
        <a href="#" className="block p-2 hover:bg-gray-700">Link 3</a>
        <div className="mt-auto">
          <button className="w-full py-2 bg-red-600/50 hover:bg-red-700 text-gray-200 font-semibold rounded-md">
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start">
        <h1 className="text-7xl font-bold p-8 text-gray-200">{welcomeMessage}</h1>
        <div className="flex mt-8 items-center gap-x-12">
          <div className="flex flex-col items-center justify-start text-gray-400 bg-gray-800/70 p-24 w-96">
            <GitHubProfileCard username="Alexa0504" />
          </div>
          <div className="flex flex-col items-center justify-start text-gray-400 bg-gray-800/70 p-24 w-96">
            <GitHubProfileCard username="TTom08" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
