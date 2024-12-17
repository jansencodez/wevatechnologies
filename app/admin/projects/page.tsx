"use client";

import React, { useState, useEffect } from "react";
import {
  cardStyle,
  titleStyle,
  tableHeaderStyle,
  tableRowStyle,
} from "../styles/commonstyles";
import { BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid } from "recharts";
import ResponsiveChartWrapper from "../components/ResponsiveChartWrapper";

type Project = {
  id: number;
  title: string;
  status: string;
};

const Projects: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this is true only on the client
  }, []);

  const projects: Project[] = [
    { id: 1, title: "Project Alpha", status: "In Progress" },
    { id: 2, title: "Project Beta", status: "Completed" },
  ];

  // Map the projects to include a numerical `statusValue`
  const chartData = projects.map((project) => ({
    name: project.title,
    statusValue: project.status === "In Progress" ? 1 : 2,
  }));

  return (
    <div className="p-6">
      <div className={cardStyle}>
        <h2 className={titleStyle}>Projects</h2>
        {isClient && ( // Only render the chart on the client
          <ResponsiveChartWrapper>
            <BarChart width={600} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="statusValue" fill="#82ca9d" />
            </BarChart>
          </ResponsiveChartWrapper>
        )}
        <table className="w-full table-auto mt-4">
          <thead>
            <tr>
              <th className={tableHeaderStyle}>Project Title</th>
              <th className={tableHeaderStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className={tableRowStyle}>
                <td className="py-2">{project.title}</td>
                <td>{project.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
