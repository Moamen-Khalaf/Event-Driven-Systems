import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTable } from "@/store/table";

const chartConfig = {
  Customers: {
    label: "N.o customers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Chart() {
  const chartData = useTable((state) => state.chartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Chart</CardTitle>
        <CardDescription>Number of customers over time</CardDescription>
      </CardHeader>
      <CardContent className="border-none shadow-none">
        <ChartContainer config={chartConfig}>
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={true} />
            <YAxis tickLine={true} axisLine={true} tickMargin={8} />
            <XAxis
              dataKey="Clock"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent hideLabel />}
              labelClassName="flex gap-2"
            />
            <Line
              dataKey="Customers"
              type="step"
              stroke="var(--color-Customers)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
