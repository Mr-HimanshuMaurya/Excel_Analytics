import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import * as XLSX from "xlsx";
import {
  Upload,
  BarChart2,
  FileText,
  ChevronDown,
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const chartTypes = ["Bar", "Line", "Pie", "Doughnut", "3D Scatter", "3D Line", "3D Surface"];

const Visualize = () => {
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [chartType, setChartType] = useState("");
  const [chartData, setChartData] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [generatedChart, setGeneratedChart] = useState(null);

  useEffect(() => {
    setGeneratedChart(null);
  }, [chartType]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (validTypes.includes(file.type)) {
        setFileName(file.name);
        setError("");
        readExcel(file);
      } else {
        resetAll();
        setError("Please upload a valid Excel file (.xls or .xlsx)");
      }
    }
  };

  const resetAll = () => {
    setFileName("");
    setExcelData(null);
    setChartData(null);
    setChartType("");
    setHeaders([]);
    setXAxis("");
    setYAxis("");
    setGeneratedChart(null);
    setError("");
  };

  const readExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 1) {
          setExcelData(jsonData);
          setHeaders(jsonData[0]);
        } else {
          setError("Excel file must contain at least one row of data");
        }
      } catch (err) {
        console.error("Error reading Excel file:", err);
        setError("Failed to read file. Please try another file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

const generateChart = () => {
  if (!excelData || !chartType) {
    setError("Please select chart type and axes");
    return;
  }

  const xIndex = headers.indexOf(xAxis);
  const yIndex = headers.indexOf(yAxis);

  if (["Bar", "Line", "Pie", "Doughnut"].includes(chartType)) {
    if (["Pie", "Doughnut"].includes(chartType)) {
      if (yIndex === -1) {
        setError("Please select Y-axis for Pie/Doughnut");
        return;
      }
      const labels = excelData.slice(1).map((row) => row[yIndex]);
      const values = labels.map(() => 1); // Dummy equal values
      setChartData({
        labels,
        datasets: [
          {
            label: yAxis,
            data: values,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
      });
    } else {
      if (xIndex === -1 || yIndex === -1) {
        setError("Invalid axis selection");
        return;
      }
      const labels = excelData.slice(1).map((row) => row[xIndex]);
      const values = excelData.slice(1).map((row) =>
        parseFloat(row[yIndex])
      );

      if (values.some((val) => isNaN(val))) {
        setError("Y-axis contains non-numeric values");
        return;
      }

      setChartData({
        labels,
        datasets: [
          {
            label: yAxis,
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      });
    }
  } else {
    if (xIndex === -1 || yIndex === -1) {
      setError("Invalid axis selection for 3D chart");
      return;
    }

    const x = excelData.slice(1).map((row) => row[xIndex]);
    const y = excelData.slice(1).map((row) => row[yIndex]);
    const z = y.map((_, idx) => idx); // Auto Z

    let data = [];

   if (chartType === "3D Scatter") {
    data = [
      {
        type: "scatter3d",
        mode: "markers",
        x,
        y,
        z,
        marker: {
          size: 5,
          color: "#17BECF",
          colorscale: "Viridis",
        },
      },
    ];
  } else if (chartType === "3D Line") {
    data = [
      {
        type: "scatter3d",
      mode: "lines",
      x,
      y,
      z,
      line: {
        width: 6,
        color: "#17BECF",
        },
      },
    ];
  } else if (chartType === "3D Surface") {
    const size = Math.floor(Math.sqrt(y.length));
    if (size * size !== y.length) {
      setError("3D Surface requires square data (e.g. 16 rows, 25 rows, etc.)");
      return;
    }
    const gridZ = [];
    for (let i = 0; i < size; i++) {
      gridZ.push(y.slice(i * size, (i + 1) * size));
    }
    data = [
      {
        type: "surface",
        z: gridZ,
      },
    ];
  }

  setChartData(data);
}

  setGeneratedChart(chartType);
  setError("");
};

  const renderChart = () => {
    if (!chartData || !generatedChart) return null;

    if (["Bar", "Line", "Pie", "Doughnut"].includes(generatedChart)) {
      const props = { data: chartData };
      switch (generatedChart) {
        case "Bar":
          return <Bar {...props} />;
        case "Line":
          return <Line {...props} />;
        case "Pie":
          return <Pie {...props} />;
        case "Doughnut":
          return <Doughnut {...props} />;
        default:
          return null;
      }
    } else {
      return <Plot data={chartData} layout={{ autosize: true, height: 500 }} />;
    }
  };

  const isAxesSelectionEnabled = () =>
    excelData && chartType && !["Pie", "Doughnut"].includes(chartType);

  return (
    <>
      <div className="p-8 space-y-8 bg-gradient-to-tr from-red-600 via-white to-yellow-400">
        <h2 className="text-3xl font-bold text-center text-blue-700">
          2D & 3D Chart Visualizer
        </h2>
        <div className="absolute top-4 right-4">
          <div className="relative group">
            <button
              onClick={resetAll}
              className="p-2 mt-10 mr-5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all border border-gray-300"
            >
              <RefreshCcw className="w-5 h-5 text-blue-600" />
            </button>
            <div className="absolute top-full mt-2 left-3/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded-md px-3 py-1 whitespace-nowrap">
              Reset All Data
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-blue-700 text-center flex items-center justify-center gap-2">
              <Upload className="w-6 h-6" /> Upload Excel
            </h2>
            <input
              type="file"
              accept=".xls,.xlsx"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="block w-full text-center py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg cursor-pointer hover:opacity-90 transition-all font-semibold"
            >
              <Upload className="inline w-5 h-5 mr-2" /> Choose File
            </label>

            {fileName && (
              <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" /> {fileName}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-500 flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4" /> {error}
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl space-y-6 border border-gray-200">
            <h3 className="text-xl font-bold text-blue-700 text-center flex items-center justify-center gap-2">
              <BarChart2 className="w-6 h-6" /> Chart Options
            </h3>

            <div className="space-y-4">
              <div className="relative">
                <select
                  disabled={!excelData}
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  className="w-full p-3 pr-10 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                >
                  <option value="">Select Chart Type</option>
                  {chartTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <select
                  disabled={!isAxesSelectionEnabled()}
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  className="w-full p-3 pr-10 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                >
                  <option value="">Select X-Axis</option>
                  {headers.map((h, i) => (
                    <option key={i} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  disabled={!excelData || !chartType}
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  className="w-full p-3 pr-10 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                >
                  <option value="">Select Y-Axis</option>
                  {headers.map((h, i) => (
                    <option key={i} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <button
                disabled={
                  !chartType ||
                  (!["Pie", "Doughnut"].includes(chartType) &&
                    (!xAxis || !yAxis))
                }
                onClick={generateChart}
                className={`w-full py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  !chartType ||
                  (!["Pie", "Doughnut"].includes(chartType) &&
                    (!xAxis || !yAxis))
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <BarChart2 className="w-5 h-5" /> Generate Chart
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 min-h-[400px] flex justify-center items-center border border-gray-200">
          {renderChart() || (
            <p className="text-gray-400 text-lg">No chart generated yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Visualize;
