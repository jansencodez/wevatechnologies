"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  cardStyle,
  titleStyle,
  tableHeaderStyle,
  tableRowStyle,
} from "../styles/commonstyles";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type Project = {
  id: string;
  name: string;
  status: string;
  completion_percentage: number;
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Ensure this is true only on the client
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/projects/completion`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Projects:", response.data);
      setProjects(response.data);
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  const chartData = {
    labels: projects.map((project) => project.name),
    datasets: [
      {
        label: "Project Completion (%)",
        data: projects.map((project) => project.completion_percentage),
        backgroundColor: "#82ca9d",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Project Completion Chart",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          callback: function (tickValue: number | string) {
            return `${tickValue}%`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div className={cardStyle}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={titleStyle}>Projects</h2>
          <button
            onClick={() => router.push("/admin/projects/manage")}
            className="px-4 py-2 bg-blue-500 text-white font-bold text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Manage
          </button>
        </div>
        {isClient && ( // Only render the chart on the client
          <div>
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
        <table className="w-full table-auto mt-4">
          <thead>
            <tr>
              <th className={tableHeaderStyle}>Project Title</th>
              <th className={tableHeaderStyle}>Status</th>
              <th className={tableHeaderStyle}>Completion (%)</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className={tableRowStyle}>
                <td className="py-2">{project.name}</td>
                <td>{project.status}</td>
                <td>{project.completion_percentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Projects;
