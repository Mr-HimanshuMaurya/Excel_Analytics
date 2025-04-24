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
import { Bar, Line, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import * as XLSX from "xlsx";

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

const chartTypes = ["Bar", "Line", "Pie", "Doughnut", "Radar", "PolarArea"];

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

  // Reset selections when chart type changes
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
        setFileName("");
        setExcelData(null);
        setChartData(null);
        setChartType("");
        setHeaders([]);
        setXAxis("");
        setYAxis("");
        setGeneratedChart(null);
        setError("Please upload a valid Excel file (.xls or .xlsx)");
      }
    }
  };

  const readExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length > 1) {
          // Store the full Excel data
          setExcelData(jsonData);

          // Extract headers (first row)
          const headerRow = jsonData[0];
          setHeaders(headerRow);

          // Reset selections
          setXAxis("");
          setYAxis("");
          setChartType("");
          setGeneratedChart(null);
        } else {
          setError("Excel file must contain at least one row of data");
        }
      } catch (err) {
        console.error("Error reading Excel file:", err);
        setError("Failed to read Excel file. Please try another file.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const generateChart = () => {
    if (!excelData || !chartType || !xAxis || !yAxis) {
      setError("Please select chart type, X-axis and Y-axis");
      return;
    }

    // Find column indices
    const xIndex = headers.indexOf(xAxis);
    const yIndex = headers.indexOf(yAxis);

    if (xIndex === -1 || yIndex === -1) {
      setError("Invalid axis selection");
      return;
    }

    // Extract data for the selected columns
    const labels = excelData.slice(1).map((row) => row[xIndex]);
    const values = excelData.slice(1).map((row) => row[yIndex]);

    // Create chart data
    const newChartData = {
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
    };

    setChartData(newChartData);
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
      case "Radar":
        return <Radar {...chartProps} />;
      case "PolarArea":
        return <PolarArea {...chartProps} />;
      default:
        return null;
    }
  };

  // Check if axes selection should be enabled based on chart type
  const isAxesSelectionEnabled = () => {
    return (
      excelData && chartType && ["Bar", "Line", "Radar"].includes(chartType)
    );
  };

  return (
    // Upload Container
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] grid-rows-[auto_1fr] gap-5 p-5 min-h-screen">
      <div className="bg-gray-50 p-5 rounded-lg shadow-md text-center h-fit">
        <h2 className="text-xl font-semibold mb-5 text-gray-700">
          Upload Excel File
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
          className="inline-block px-5 py-2.5 bg-green-500 text-white rounded-md font-medium cursor-pointer hover:bg-green-600 transition-colors duration-300"
        >
          Choose File
        </label>
        {fileName && (
          <p className="mt-4 text-sm text-gray-700">
            Selected File: {fileName}
          </p>
        )}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      </div>

      {/* Chart Options */}
      <div className="flex justify-end">
        <div className="w-full max-w-md bg-gray-50 p-5 rounded-lg shadow-md flex flex-col gap-4">
          <h3 className="text-lg font-medium text-center text-gray-700">
            Chart Options
          </h3>

          <select
            disabled={!excelData}
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className={`w-full p-3 rounded-md border text-base ${
              !excelData
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            }`}
          >
            <option value="">Select Chart Type</option>
            {chartTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            disabled={!isAxesSelectionEnabled()}
            value={xAxis}
            onChange={(e) => setXAxis(e.target.value)}
            className={`w-full p-3 rounded-md border text-base ${
              !isAxesSelectionEnabled()
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            }`}
          >
            <option value="">Select X-Axis Data</option>
            {headers.map((header, index) => (
              <option key={`x-${index}`} value={header}>
                {header}
              </option>
            ))}
          </select>

          <select
            disabled={!isAxesSelectionEnabled()}
            value={yAxis}
            onChange={(e) => setYAxis(e.target.value)}
            className={`w-full p-3 rounded-md border text-base ${
              !isAxesSelectionEnabled()
                ? "bg-gray-100 cursor-not-allowed"
                : "bg-white border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            }`}
          >
            <option value="">Select Y-Axis Data</option>
            {headers.map((header, index) => (
              <option key={`y-${index}`} value={header}>
                {header}
              </option>
            ))}
          </select>

          <button
            disabled={
              !chartType ||
              (!["Pie", "Doughnut", "PolarArea"].includes(chartType) &&
                (!xAxis || !yAxis))
            }
            onClick={generateChart}
            className={`mt-2 py-3 px-5 rounded-md font-medium text-white ${
              !chartType ||
              (!["Pie", "Doughnut", "PolarArea"].includes(chartType) &&
                (!xAxis || !yAxis))
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
            }`}
          >
            Generate Chart
          </button>
        </div>
      </div>

      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-md p-5 min-h-[400px] flex justify-center items-center">
        {renderChart()}
      </div>
    </div>
  );
};

export default FileUpload;
