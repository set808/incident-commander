import { JSX, useEffect, useState } from "react";

export type ChartDatum = [string, number];

export type CRTBrailleChartProps = {
  dataPoints: ChartDatum[];
};

const MAX_WIDTH = 100;

function generateBrailleChart(dataPoints: number[]): JSX.Element[] {
  if (dataPoints.length === 0) return [];

  const chartHeight = 11; // For 0% to 100% in 10% increments
  const brailleChartLines: string[] = Array(chartHeight).fill("");

  const scaledDataPoints = dataPoints.map((value) => {
    return Math.round((value / 100) * (chartHeight - 1));
  });

  for (let dataIndex = 0; dataIndex < scaledDataPoints.length; dataIndex++) {
    const scaledValue = scaledDataPoints[dataIndex];
    for (
      let currentHeightLevel = 0;
      currentHeightLevel < chartHeight;
      currentHeightLevel++
    ) {
      brailleChartLines[chartHeight - 1 - currentHeightLevel] +=
        scaledValue >= currentHeightLevel ? "⣿" : " ";
    }
  }

  const labeledLines = brailleChartLines.map((line, index) => {
    const percentage = (chartHeight - 1 - index) * 10;
    const label = percentage.toString().padStart(3, " ") + "% | ";
    return (
      <div key={`line-${index}`} data-chart-line>
        {label}
        {line}
      </div>
    );
  });

  return labeledLines;
}

function generateXAxis(timestamps: string[]): JSX.Element {
  const dataLength = timestamps.length;
  let xAxisLine = "    +";
  for (let i = 0; i < dataLength; i++) {
    xAxisLine += i % 5 === 0 ? "|" : "-";
  }

  let timeLabels = "     ";
  for (let i = 0; i < dataLength; i++) {
    if (i % 5 === 0 && timestamps[i]) {
      timeLabels += timestamps[i].padEnd(5, " ").slice(0, 5);
    } else {
      timeLabels += " ".repeat(5);
    }
  }

  return (
    <>
      <div>{xAxisLine}</div>
      <div className="text-xs text-green-600">{timeLabels}</div>
    </>
  );
}

export default function CRTBrailleChart({
  dataPoints,
}: CRTBrailleChartProps): JSX.Element {
  const [chartDataPoints, setChartDataPoints] = useState<number[]>([]);
  const [chartTimestamps, setChartTimestamps] = useState<string[]>([]);

  useEffect(() => {
    if (!Array.isArray(dataPoints)) return;

    const timestamps: string[] = [];
    const values: number[] = [];

    for (const item of dataPoints) {
      if (
        Array.isArray(item) &&
        typeof item[0] === "string" &&
        typeof item[1] === "number"
      ) {
        timestamps.push(item[0]);
        values.push(item[1]);
      }
    }

    // Fit the chart width
    const totalPoints = values.length;
    const step =
      totalPoints > MAX_WIDTH ? Math.ceil(totalPoints / MAX_WIDTH) : 1;

    const reducedValues = values.filter((_, i) => i % step === 0);
    const reducedTimestamps = timestamps.filter((_, i) => i % step === 0);

    setChartDataPoints(reducedValues);
    setChartTimestamps(reducedTimestamps);
  }, [dataPoints]);

  return (
    <div
      className="bg-black text-green-500 font-mono p-4 rounded-2xl shadow-lg border border-green-800 crt"
      data-chart-type="braille"
      data-chart
    >
      <div className="text-sm mb-2">[ Incident CPU Load (%) ]</div>
      <pre className="leading-tight text-green-400">
        {generateBrailleChart(chartDataPoints)}
        {generateXAxis(chartTimestamps)}
      </pre>
    </div>
  );
}
