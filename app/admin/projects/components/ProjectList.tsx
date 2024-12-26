"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  created_by: string;
  updated_by: string;
  status: string;
}

interface ProjectListProps {
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onEdit, onDelete }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      let token = sessionStorage.getItem("token");
      const refreshToken = sessionStorage.getItem("refresh_token");

      if (!token) {
        console.log("No access token found");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401 && refreshToken) {
          // Try refreshing the token
          const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/refresh`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refresh_token: refreshToken }),
            }
          );

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            sessionStorage.setItem("token", data.access_token);

            // Retry the original request with the new token
            token = data.access_token;
            const retryResponse = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/admin/projects`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setProjects(retryResponse.data);
          } else {
            throw new Error("Failed to refresh token");
          }
        } else {
          setProjects(response.data);
        }
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Projects</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="p-4 border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {project.name}
            </h3>
            <p className="text-gray-600">{project.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-bold">Start Date:</span>{" "}
              {new Date(project.start_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-bold">End Date:</span>{" "}
              {new Date(project.end_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-bold">Status:</span> {project.status}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-bold">Created By:</span>{" "}
              {project.created_by}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              <span className="font-bold">Updated By:</span>{" "}
              {project.updated_by}
            </p>
            <button
              onClick={() => onEdit(project)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white font-bold text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="mt-3 ml-3 px-4 py-2 bg-red-500 text-white font-bold text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
