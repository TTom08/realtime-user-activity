// src/components/HomePage.tsx
import React from "react";
import GitHubProfileCard from "./GitHubProfileCard";

const HomePage = () => {
  return (
    <div className="flex flex-row h-screen bg-radial-gradient-colors">
      {/* Side panel*/}
      <div className="w-64 bg-gray-800/70 text-white p-4 shadow-xl/100 ">
        <h1 className="text-2xl font-bold text-center">Dashboard</h1>
        <a href="#" className="block p-2 mt-4 hover:bg-red-400">
          Link 1
        </a>
        <a href="#" className="block p-2 hover:bg-gray-700">
          Link 2
        </a>
        <a href="#" className="block p-2 hover:bg-gray-700">
          Link 3
        </a>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start">
        <h1 className="text-7xl font-bold p-8 text-gray-900">Welcome</h1>
        <div className="flex mt-8 items-center gap-x-12">
          <div className="flex flex-col items-center justify-start text-gray-400 bg-gray-800 p-24 max-w-xl">
            <GitHubProfileCard username="Alexa0504" />
          </div>
          {/* 2. GitHub profil */}
          <div className=" flex flex-col items-center justify-start text-gray-400 bg-gray-800 p-24 max-w-3xl">
            <GitHubProfileCard username="TTom08" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
