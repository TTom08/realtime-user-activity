import React, { useState, useEffect } from "react";

// Típusok definiálása a GitHub API adatokhoz
interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  public_repos: number;
  followers: number;
  bio: string | null;
  message?: string;
}

interface GitHubProfileCardProps {
  username: string;
}

const GitHubProfileCard: React.FC<GitHubProfileCardProps> = ({ username }) => {
  const [profileData, setProfileData] = useState<GitHubUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
        );

        if (!response.ok) {
          const errorData = await response.json();
          setProfileData(errorData as GitHubUser);
        } else {
          const data: GitHubUser = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
        setProfileData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (!profileData || profileData.message === "Not Found") {
    return <p>Profile not found.</p>;
  }

  return (
    <div className="flex flex-col items-center text-center p-4">
      <h2 className="text-2xl font-bold mb-2">{username}</h2>
      <img
        src={profileData.avatar_url}
        alt={`${username}'s GitHub Profile`}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-xl font-bold">
        {profileData.name || profileData.login}
      </h3>
      <p className="text-gray-600 text-sm mt-1">{profileData.bio}</p>
      <div className="flex space-x-4 mt-2 text-xs text-gray-500">
        <p>Followers: {profileData.followers}</p>
        <p>Repos: {profileData.public_repos}</p>
      </div>
      <a
        href={profileData.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-red-500 mt-2 hover:underline"
      >
        View Profile
      </a>
    </div>
  );
};

export default GitHubProfileCard;
