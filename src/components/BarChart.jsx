import Chart from "react-apexcharts";
import tailwindConfig from "../../tailwind.config.js";

const BarChart = ({ id = "bar-chart", header, series = [], labels = [], options, highlight }) => {
  const { tickAmount = "dataPoints" } = options || {};

  const primaryColor = tailwindConfig.theme.extend.colors.primary;
  const secondaryColor = tailwindConfig.theme.extend.colors.secondary;
  const textColor = tailwindConfig.theme.extend.colors.text;
  const borderColor = tailwindConfig.theme.extend.colors.border;

  const extremes = () => {
    let currentHighest = 1;
    let curerntLowest = 0;

    if (series.length === 0) return { min: curerntLowest, max: currentHighest };

    series.forEach((serie) => {
      serie.data.forEach((d) => {
        const fd = Number(d);
        if (fd > currentHighest) currentHighest = fd;
        if (fd < curerntLowest) curerntLowest = fd;
      });
    });

    return { min: Math.floor(curerntLowest), max: Math.ceil(currentHighest) };
  };

  const chartOptions = {
    chart: {
      id,
      toolbar: { show: false },
      zoom: { enabled: false, allowMouseWheelZoom: false },
    },
    xaxis: {
      categories: labels,
      tickPlacement: "on",
      tickAmount,
      labels: { style: { colors: textColor } },
    },
    yaxis: {
      labels: { style: { colors: textColor } },
      min: extremes().min,
      max: extremes().max,
    },
    colors: [
      function ({ dataPointIndex, w }) {
        if (!highlight) return primaryColor[500];
        const highlightIndex = w?.globals?.categoryLabels.findIndex((e) => e === highlight);
        return dataPointIndex === highlightIndex ? secondaryColor[500] : primaryColor[500];
      },
    ],
    dataLabels: { enabled: false },
    tooltip: { theme: "dark", shared: true, intersect: false },
    markers: { size: 4 },
    stroke: {
      show: true,
      colors: [
        function ({ dataPointIndex, w }) {
          if (!highlight) return primaryColor[600];
          const highlightIndex = w?.globals?.categoryLabels.findIndex((e) => e === highlight);
          return dataPointIndex === highlightIndex ? secondaryColor[600] : primaryColor[600];
        },
      ],
      width: 2,
    },
    legend: { show: false },
    grid: { borderColor },
  };

  return (
    <div className="w-full h-full">
      {header}
      <Chart options={chartOptions} series={series} type="bar" width="100%" height="100%" />
    </div>
  );
};

export default BarChart;
