import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { db } from "../firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
      beginAtZero: true,
      grid: { color: "rgba(0, 0, 0, 0.1)" },
    },
    x: {
      grid: { display: false },
    },
  },
};

export function LineChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const userCounts = {};

      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt instanceof Timestamp) {
          const date = data.createdAt.toDate();
          const month = date.toLocaleString("default", { month: "short" });
          userCounts[month] = (userCounts[month] || 0) + 1;
        }
      });

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const labels = months;
      const data = labels.map((month) => userCounts[month] || 0);

      setChartData({
        labels,
        datasets: [
          {
            data,
            borderColor: (context) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;
              if (!chartArea) return "rgb(99, 102, 241)";
              const gradient = ctx.createLinearGradient(
                0,
                chartArea.bottom,
                0,
                chartArea.top
              );
              gradient.addColorStop(0, "rgba(203,243,255)");
              gradient.addColorStop(1, "rgba(255,207,250)");
              return gradient;
            },
            backgroundColor: "rgba(99, 102, 241, 0.5)",
            tension: 0.4,
          },
        ],
      });
    };

    fetchUserStats();
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <Line options={options} data={chartData} className="w-full h-[300px]" />
  );
}
