import { useEffect, useState } from "react";
import { StatsCard } from "@/components/stats-card";
import { ProgressCircle } from "@/components/progress-circle";
import { LineChart } from "@/components/line-chart";
import { Card } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import SearchNav from "@/components/SearchNav";
import {
  getFirestore,
  collection,
  getCountFromServer,
  query,
  where,
  Timestamp,
  getDocs,
} from "firebase/firestore";

const COLORS = [
  "#4F46E5",
  "#60A5FA",
  "#2DD4BF",
  "#FACC15",
  "#EF4444",
  "#A855F7",
  "#22D3EE",
  "#F97316",
  "#10B981",
  "#EC4899",
];

const chartConfig = {
  articles: {
    label: "Articles",
    color: "#4F46E5",
  },
};

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [newClients, setNewClients] = useState(0);
  const [articleCount, setArticleCount] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const db = getFirestore();

        // 1- جلب عدد المستخدمين
        const usersCol = collection(db, "users");
        const userCountPromise = getCountFromServer(usersCol);

        // 2- المستخدمين الجدد خلال آخر 7 أيام
        const sevenDaysAgo = Timestamp.fromDate(
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        );
        const newClientsQuery = query(
          usersCol,
          where("createdAt", ">=", sevenDaysAgo)
        );
        const newClientsPromise = getDocs(newClientsQuery);

        // 3- جلب العناوين الرئيسية للمقالات
        const articleMainCol = collection(db, "article");
        const titlesPromise = getDocs(articleMainCol);

        // تنفيذ الثلاث وعود بالتوازي
        const [userSnap, newClientsSnap, titleDocs] = await Promise.all([
          userCountPromise,
          newClientsPromise,
          titlesPromise,
        ]);

        setUserCount(userSnap.data().count);
        setNewClients(newClientsSnap.size);

        // العناوين الفرعية داخل كل عنوان رئيسي
        const subtitleNames = [
          "breastfeeding-natural-",
          "formula-feeding-artifi-",
          "baby-care-tips",
          "frequently-asked-questions",
          "physical-activity",
          "rest-and-sleep",
          "baby-health-and-common-illnesses",
          "child-growth-stages",
          "complementary-feeding-introducing-solid-foods-",
          "daily-baby-care",
          "sensory-and-motor-skills-development",
          "general-women-s-health",
          "women-s-health-after-childbirth",
          "women-s-health-before-pregnancy",
          "women-s-health-during-pregnancy",
        ];

        let totalArticles = 0;
        const categoryMap = {};

        // هنا نستخدم Promise.all لجلب المجموعات الفرعية بالتوازي لكل عنوان رئيسي
        const allSubCollectionsPromises = [];

        titleDocs.docs.forEach((titleDoc) => {
          const titleId = titleDoc.id;

          subtitleNames.forEach((subtitle) => {
            const subCollectionRef = collection(
              db,
              "article",
              titleId,
              subtitle
            );
            allSubCollectionsPromises.push(
              getDocs(subCollectionRef).then((subSnap) => {
                subSnap.forEach((doc) => {
                  const data = doc.data();
                  const category = data.category || subtitle;
                  totalArticles += 1;

                  if (categoryMap[category]) {
                    categoryMap[category].articles += 1;
                  } else {
                    categoryMap[category] = {
                      category: category.substring(0, 15),
                      articles: 1,
                    };
                  }
                });
              })
            );
          });
        });

        await Promise.all(allSubCollectionsPromises);

        setArticleCount(totalArticles);

        const chartData = Object.values(categoryMap)
          .sort((a, b) => b.articles - a.articles)
          .map((item, index) => ({
            ...item,
            fill: COLORS[index % COLORS.length],
          }))
          .slice(0, 10);

        setChartData(chartData);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load stats. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <SearchNav />
      {error && <div className="text-red-500">{error}</div>}

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          {/* Spinner بسيط */}
          <svg
            className="animate-spin h-12 w-12 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard title="Number of users" value={userCount.toString()}>
              <div className="h-[100px] w-full bg-gradient-to-r from-blue-50 to-indigo-50 flex items-end p-4">
                <div className="w-full h-[50px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md opacity-25" />
              </div>
            </StatsCard>

            <StatsCard
              title="New Clients (Last 7 Days)"
              value={newClients.toString()}
            >
              <div className="flex items-center justify-between p-4">
                <div className="text-xl font-bold text-muted-foreground">
                  <div>60% Weekly Goal</div>
                  <div>{newClients} This Week</div>
                </div>
                <ProgressCircle
                  value={Math.min((newClients / 100) * 100, 100)}
                />
              </div>
            </StatsCard>

            <StatsCard
              title="Number Of Articles"
              value={articleCount.toString()}
            >
              <div className="h-[200px] w-full">
                <ChartContainer
                  config={chartConfig}
                  className="min-h-[250px] w-full bg-white shadow-sm rounded-lg p-2"
                >
                  {chartData.length > 0 ? (
                    <BarChart
                      data={chartData}
                      layout="horizontal"
                      barCategoryGap={2}
                      margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                    >
                      <XAxis
                        dataKey="category"
                        type="category"
                        stroke="black"
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        tick={{ fontSize: 15 }}
                      />
                      <YAxis
                        type="number"
                        stroke="black"
                        domain={[0, "auto"]}
                        tickCount={5}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0, 0, 0, 0.8)",
                          color: "#fff",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="articles" radius={[4, 4, 0, 0]}>
                        {chartData.map((entry, index) => (
                          <Bar
                            key={`bar-${index}`}
                            dataKey="articles"
                            fill={entry.fill}
                          />
                        ))}
                        <LabelList
                          dataKey="articles"
                          position="top"
                          fill="#1E293B"
                          fontSize={12}
                        />
                      </Bar>
                    </BarChart>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      No articles available
                    </div>
                  )}
                </ChartContainer>
              </div>
            </StatsCard>
          </div>

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Monthly User Growth</h2>
            <LineChart />
          </Card>
        </>
      )}
    </div>
  );
}
