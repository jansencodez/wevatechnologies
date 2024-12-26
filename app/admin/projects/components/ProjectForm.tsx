"use client";

import React, { useState } from "react";

interface Project {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface ProjectFormProps {
  project: Project | null;
  onSubmit: (projectData: Project) => Promise<void>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit }) => {
  const [name, setName] = useState<string>(project ? project.name : "");
  const [description, setDescription] = useState<string>(
    project ? project.description : ""
  );
  const [startDate, setStartDate] = useState<string>(
    project ? project.start_date.split("T")[0] : ""
  );
  const [endDate, setEndDate] = useState<string>(
    project ? project.end_date.split("T")[0] : ""
  );
  const [status, setStatus] = useState<string>(
    project ? project.status : "Not Started"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const projectData: Project = {
      name,
      description,
      start_date: startDate,
      end_date: endDate,
      status,
    };
    await onSubmit(projectData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 font-bold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md resize-vertical focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="start-date"
          className="block mb-2 font-bold text-gray-700"
        >
          Start Date
        </label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="end-date"
          className="block mb-2 font-bold text-gray-700"
        >
          End Date
        </label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block mb-2 font-bold text-gray-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;
