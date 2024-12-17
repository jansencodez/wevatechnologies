"use client";

import React, { useState, useEffect } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  BarElement,
  LineElement,
  Filler,
  LinearScale,
  PointElement,
} from "chart.js";
import ResponsiveChartWrapper from "../components/ResponsiveChartWrapper";
import {
  cardStyle,
  titleStyle,
  tableHeaderStyle,
  tableRowStyle,
} from "../styles/commonstyles";

// Register necessary components for Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  LinearScale,
  PointElement,
  CategoryScale,
  BarElement,
  LineElement,
  Filler
);

type Metric = {
  name: string;
  value: number;
};

const System: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [chartType, setChartType] = useState<"pie" | "bar" | "line">("pie");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/system/metrics` // Updated API endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch metrics");
        }
        const data = await response.json();
        setMetrics(data); // Update state with real data from the API
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Chart.js data setup
  const chartData = {
    labels: metrics.map((metric) => metric.name),
    datasets: [
      {
        label: "System Metrics",
        data: metrics.map((metric) => metric.value),
        backgroundColor: ["#82ca9d", "#8884d8", "#ff7300"],
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "pie":
        return <Pie data={chartData} options={chartOptions} />;
      case "bar":
        return <Bar data={chartData} options={chartOptions} />;
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      default:
        return <Pie data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="p-6">
      <div className={cardStyle}>
        <h2 className={titleStyle}>System Monitoring</h2>

        {/* Chart Type Selection */}
        <div className="mb-4">
          <button
            onClick={() => setChartType("pie")}
            className="mr-2 p-2 bg-blue-500 text-white rounded"
          >
            Pie Chart
          </button>
          <button
            onClick={() => setChartType("bar")}
            className="mr-2 p-2 bg-blue-500 text-white rounded"
          >
            Bar Chart
          </button>
          <button
            onClick={() => setChartType("line")}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Line Chart
          </button>
        </div>

        <ResponsiveChartWrapper>{renderChart()}</ResponsiveChartWrapper>

        <table className="w-full table-auto mt-4">
          <thead>
            <tr>
              <th className={tableHeaderStyle}>Metric</th>
              <th className={tableHeaderStyle}>Value (%)</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric, index) => (
              <tr key={index} className={tableRowStyle}>
                <td className="py-2">{metric.name}</td>
                <td>{metric.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default System;
