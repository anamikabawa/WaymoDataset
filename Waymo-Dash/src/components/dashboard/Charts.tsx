import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
  Area,
} from "recharts";
import {
  usePieChartData,
  useHistogramData,
  useBoxPlotData,
  useTopFilesData,
  useIntentData,
  useScatterData,
} from "@/hooks/useEdgeCaseData";

export const Charts = () => {
  const { data: pieData } = usePieChartData();
  const { data: histogramData } = useHistogramData();
  const { data: boxPlotData } = useBoxPlotData();
  const { data: topFilesData } = useTopFilesData();
  const { data: intentData } = useIntentData();
  const { data: scatterData } = useScatterData();

  return (
    <div className="space-y-6">
      {/* First Row: 2x2 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Distribution of Edge Case Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {pieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Files Bar Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Top 10 Files with Most Edge Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topFilesData} layout="vertical" margin={{ left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--foreground))" />
                <YAxis type="category" dataKey="file" stroke="hsl(var(--foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Intent Bar Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Edge Cases by Driving Intent</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={intentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="intent" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-3))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Scatter Plot */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Speed vs. Deceleration</CardTitle>
            <p className="text-sm text-muted-foreground">Bubble size = severity</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  dataKey="speed"
                  name="Speed"
                  unit=" m/s"
                  stroke="hsl(var(--foreground))"
                />
                <YAxis
                  type="number"
                  dataKey="accel"
                  name="Accel"
                  unit=" m/s²"
                  stroke="hsl(var(--foreground))"
                />
                <ZAxis type="number" dataKey="severity" range={[20, 400]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Scatter data={scatterData} fill="hsl(var(--chart-1))" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row: 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histogram */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Severity Distribution (Histogram)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--chart-4))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Box Plot (as Range Chart) */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Severity Range by Type (Box Plot)</CardTitle>
            <p className="text-sm text-muted-foreground">Shows min, Q1, median, Q3, max</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={boxPlotData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="type" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" domain={[0, 1]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="max"
                  stroke="hsl(var(--chart-5))"
                  fill="hsl(var(--chart-5))"
                  fillOpacity={0.1}
                />
                <Bar dataKey="q3" stackId="box" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
                <Bar dataKey="median" stackId="box" fill="hsl(var(--chart-1))" />
                <Bar dataKey="q1" stackId="box" fill="hsl(var(--chart-2))" fillOpacity={0.6} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
