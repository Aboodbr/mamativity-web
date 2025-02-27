import { StatsCard } from "@/components/stats-card";
import { ProgressCircle } from "@/components/progress-circle";
import { LineChart } from "@/components/line-chart";
import { Card } from "@/components/ui/card";
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import CustomBar from "@/components/custom-bar"; // Import the custom bar component
import SearchNav from "@/components/SearchNav";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};

export default function DashboardPage() {
  const chartData = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Apr", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
    { month: "Jul", desktop: 250, mobile: 160 },
    { month: "Aug", desktop: 300, mobile: 180 },
    { month: "Sep", desktop: 280, mobile: 170 },
    { month: "Oct", desktop: 320, mobile: 190 },
    { month: "Nov", desktop: 310, mobile: 175 },
    { month: "Dec", desktop: 290, mobile: 160 },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <SearchNav />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard title="Number of users" value="2110">
          <div className="h-[100px] w-full bg-gradient-to-r from-blue-50 to-indigo-50 flex items-end p-4">
            <div className="w-full h-[50px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md opacity-25" />
          </div>
        </StatsCard>

        <StatsCard title="New Clients" value="21">
          <div className="flex items-center justify-between p-4">
            <div className="text-xl font-bold text-muted-foreground ">
              <div>60% Daily Goal</div>
              <div>72 This Week</div>
            </div>
            <ProgressCircle value={62} />
          </div>
        </StatsCard>

        <StatsCard title="Number of articles" value="">
          <div className="h-[150px] -ml-5 w-full mb-10">
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="desktop"
                  shape={<CustomBar />} 
                  radius={[10, 10, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </div>
        </StatsCard>
      </div>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">System Performance</h2>
        <LineChart />
      </Card>
    </div>
  );
}