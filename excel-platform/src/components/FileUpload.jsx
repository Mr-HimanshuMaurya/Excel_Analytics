import React, { useState, useEffect } from "react";
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
import LayoutSetter from "./LayoutSetter";
import {
  Upload,
  BarChart2,
  FileText,
  ChevronDown,
  AlertTriangle,
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

const chartTypes = ["Bar", "Line", "Pie", "Doughnut"];

const FileUpload = () => {
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
    if (!excelData || !chartType || !xAxis || !yAxis) {
      setError("Please select chart type, X-axis and Y-axis");
      return;
    }

    const xIndex = headers.indexOf(xAxis);
    const yIndex = headers.indexOf(yAxis);

    if (xIndex === -1 || yIndex === -1) {
      setError("Invalid axis selection");
      return;
    }

    const labels = excelData.slice(1).map((row) => row[xIndex]);
    const values = excelData.slice(1).map((row) => row[yIndex]);

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
    setGeneratedChart(chartType);
    setError("");
  };

  const renderChart = () => {
    if (!chartData || !generatedChart) return null;
    const chartProps = { data: chartData };
    switch (generatedChart) {
      case "Bar":
        return <Bar {...chartProps} />;
      case "Line":
        return <Line {...chartProps} />;
      case "Pie":
        return <Pie {...chartProps} />;
      case "Doughnut":
        return <Doughnut {...chartProps} />;
      default:
        return null;
    }
  };

  const isAxesSelectionEnabled = () =>
    excelData && chartType && ["Bar", "Line"].includes(chartType);

  return (
    <LayoutSetter>
      <div className="p-8 space-y-8 min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Card Section*/}
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
              {/* Chart Type */}
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
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  disabled={!isAxesSelectionEnabled()}
                  value={xAxis}
                  onChange={(e) => setXAxis(e.target.value)}
                  className="w-full p-3 pr-10 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                >
                  <option value="">Select X-Axis</option>
                  {headers.map((header, idx) => (
                    <option key={`x-${idx}`} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  disabled={!isAxesSelectionEnabled()}
                  value={yAxis}
                  onChange={(e) => setYAxis(e.target.value)}
                  className="w-full p-3 pr-10 rounded-md border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                >
                  <option value="">Select Y-Axis</option>
                  {headers.map((header, idx) => (
                    <option key={`y-${idx}`} value={header}>
                      {header}
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
            <p className="text-gray-400 text-lg">No chart generated yet.</p>
          )}
        </div>
      </div>
    </LayoutSetter>
  );
};

export default FileUpload;
