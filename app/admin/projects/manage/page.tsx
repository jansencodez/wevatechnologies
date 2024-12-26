"use client";

import React, { useState } from "react";
import axios from "axios";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";

interface Project {
  id?: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
}

const ProjectsPage: React.FC = () => {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const handleCreateProject = async (projectData: Project) => {
    const token = sessionStorage.getItem("token");
    const refreshToken = sessionStorage.getItem("refresh_token");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/projects`,
        projectData,
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
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/projects`,
            projectData,
            {
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            }
          );
        } else {
          throw new Error("Failed to refresh token");
        }
      }

      setEditingProject(null);
      setIsFormVisible(false);
    } catch (err) {
      setError("Error creating project");
      console.log(err);
    }
  };

  const handleUpdateProject = async (projectData: Project) => {
    const token = sessionStorage.getItem("token");

    if (editingProject) {
      try {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/projects/${editingProject.id}`,
          projectData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditingProject(null);
        setIsFormVisible(false);
      } catch (err) {
        setError("Error updating project");
        console.log(err);
      }
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormVisible(true);
  };

  const handleDelete = (id: string) => {
    const token = sessionStorage.getItem("token");

    try {
      axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/admin/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      setError("Error deleting project");
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Manage Projects</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white font-bold text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {isFormVisible ? "Hide Form" : "Add New Project"}
      </button>
      {isFormVisible && (
        <ProjectForm
          project={editingProject}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        />
      )}
      <ProjectList onEdit={handleEditProject} onDelete={handleDelete} />
    </div>
  );
};

export default ProjectsPage;
