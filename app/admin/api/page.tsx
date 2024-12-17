"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import ResponsiveChartWrapper from "../components/ResponsiveChartWrapper";
import {
  cardStyle,
  titleStyle,
  tableHeaderStyle,
  tableRowStyle,
} from "../styles/commonstyles";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
type ApiCall = {
  id: number;
  endpoint: string;
  calls: number;
};

const ApiUsage: React.FC = () => {
  const [apiCalls, setApiCalls] = useState<ApiCall[]>([]);
  const [isClient, setIsClient] = useState(false); // Track if it's client-side render
  const [chartType, setChartType] = useState<"bar" | "line" | "pie" | "donut">(
    "bar"
  ); // State for chart type

  useEffect(() => {
    setIsClient(true);

    const fetchApiUsage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/usage`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch API usage data");
        }
        const data = await response.json();

        const formattedData = data.map(
          (api: { endpoint: string; calls: number }, index: number) => ({
            id: index + 1,
            endpoint: api.endpoint,
            calls: api.calls,
          })
        );

        setApiCalls(formattedData);
      } catch (error) {
        console.log("Error fetching API usage data:", error);
      }
    };

    fetchApiUsage();
  }, []);

  // Clear the API usage for a specific endpoint
  const resetApiUsage = async (endpoint: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reset_usage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endpoint }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reset API usage");
      }
      // Update state after resetting
      setApiCalls((prevCalls) =>
        prevCalls.map((api) =>
          api.endpoint === endpoint ? { ...api, calls: 0 } : api
        )
      );
    } catch (error) {
      console.log("Error resetting API usage:", error);
    }
  };

  // Clear the API usage for all endpoints
  const resetAllApiUsage = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reset_all_usage`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to reset all API usage");
      }
      // Update state after resetting all usage
      setApiCalls((prevCalls) =>
        prevCalls.map((api) => ({ ...api, calls: 0 }))
      );
    } catch (error) {
      console.log("Error resetting all API usage:", error);
    }
  };

  // If it's the server-side render, return null to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  // Prepare data for the chart
  const chartData = {
    labels: apiCalls.map((api) => api.endpoint),
    datasets: [
      {
        label: "API Calls",
        data: apiCalls.map((api) => api.calls),
        backgroundColor: "#8884d8",
        borderColor: "#8884d8",
        borderWidth: 1,
        pointRadius: 5,
        pointHoverRadius: 10,
        pointHitRadius: 10,
        showLine: true,
        fill: false,
      },
    ],
  };

  return (
    <div className="p-6">
      <div className={cardStyle}>
        <h2 className={titleStyle}>API Usage</h2>

        {/* Dropdown to select chart type */}
        <div className="mb-4">
          <select
            value={chartType}
            onChange={(e) =>
              setChartType(e.target.value as "bar" | "line" | "pie" | "donut")
            }
            className="p-2 border rounded"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
            <option value="pie">Pie Chart</option>
            <option value="donut">Donut Chart</option>
          </select>
        </div>

        <ResponsiveChartWrapper>
          {chartType === "bar" ? (
            <Chart type="bar" data={chartData} />
          ) : chartType === "line" ? (
            <Chart type="line" data={chartData} />
          ) : chartType === "pie" ? (
            <Chart
              type="pie"
              data={{
                labels: apiCalls.map((api) => api.endpoint),
                datasets: [
                  {
                    data: apiCalls.map((api) => api.calls),
                    backgroundColor: apiCalls.map((entry) =>
                      entry.calls > 50 ? "#82ca9d" : "#8884d8"
                    ),
                  },
                ],
              }}
            />
          ) : (
            <Chart
              type="doughnut"
              data={{
                labels: apiCalls.map((api) => api.endpoint),
                datasets: [
                  {
                    data: apiCalls.map((api) => api.calls),
                    backgroundColor: apiCalls.map((entry) =>
                      entry.calls > 50 ? "#82ca9d" : "#8884d8"
                    ),
                  },
                ],
              }}
            />
          )}
        </ResponsiveChartWrapper>

        <div className="mt-4">
          {/* Buttons to reset API usage */}
          <button
            onClick={() => resetAllApiUsage()}
            className="bg-red-500 text-white p-2 rounded mr-4"
          >
            Reset All Usage
          </button>
        </div>

        <table className="w-full table-auto mt-4">
          <thead>
            <tr>
              <th className={tableHeaderStyle}>API Endpoint</th>
              <th className={tableHeaderStyle}>Calls</th>
              <th className={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {apiCalls.map((api) => (
              <tr key={api.id} className={tableRowStyle}>
                <td className="py-2">{api.endpoint}</td>
                <td>{api.calls}</td>
                <td>
                  <button
                    onClick={() => resetApiUsage(api.endpoint)}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    Reset Usage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApiUsage;
