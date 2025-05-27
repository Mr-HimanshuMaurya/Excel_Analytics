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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LayoutSetter from "./LayoutSetter";
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
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false);
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

  const generateColors = (count) =>
    Array.from(
      { length: count },
      (_, i) => `hsl(${(i * 360) / count}, 70%, 60%)`
    );

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
    const colors = generateColors(values.length);

    setChartData({
      labels,
      datasets: [
        {
          label: yAxis,
          data: values,
          backgroundColor:
            chartType === "Pie" || chartType === "Doughnut"
              ? colors
              : "rgba(75, 192, 192, 0.6)",
          borderColor:
            chartType === "Pie" || chartType === "Doughnut"
              ? colors
              : "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });

    setGeneratedChart(chartType);
    setError("");
  };

  const renderChart = () => {
    if (!chartData || !generatedChart) return null;
    const chartProps = {
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    };
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

  const downloadChartAsPNG = async () => {
    const chartElement = document.getElementById("chart-container");
    if (!chartElement) return;
    const canvas = await html2canvas(chartElement);
    const link = document.createElement("a");
    link.download = "chart.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const downloadChartAsPDF = async () => {
    const chartElement = document.getElementById("chart-container");
    if (!chartElement) return;
    const canvas = await html2canvas(chartElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("chart.pdf");
  };

  return (
    <LayoutSetter>
      <div className="relative p-8 space-y-8 min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100">
        <div className="absolute top-4 right-4">
          <div className="relative group">
            <button
              onClick={resetAll}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all border border-gray-300"
            >
              <RefreshCcw className="w-5 h-5 text-blue-600" />
            </button>
            <div className="absolute top-full mt-2 left-3/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs rounded-md px-3 py-1 whitespace-nowrap">
              Reset All Data
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
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

          {/* Chart Options */}
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

              {/* X-Axis */}
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

              {/* Y-Axis */}
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

        {/* Chart Display */}
        <div
          id="chart-container"
          className="relative bg-white rounded-2xl shadow-2xl p-8 min-h-[250px] flex justify-center items-center border border-gray-200"
        >
          {generatedChart && (
            <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
              <button
                onClick={downloadChartAsPNG}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
              >
                Download PNG
              </button>
              <button
                onClick={downloadChartAsPDF}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md transition"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md transition"
              >
                Generate AI Analysis
              </button>
            </div>
          )}
          {renderChart() || (
            <p className="text-gray-400 text-lg">No chart generated yet</p>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full space-y-4">
              <h3 className="text-lg font-bold text-red-600">
                Confirm Data Submission
              </h3>
              <p className="text-sm text-gray-600">
                Submitting your data for AI analysis may share sensitive content
                with external systems. Are you sure you want to continue?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    // AI analysis logic will be added later
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutSetter>
  );
};

export default FileUpload;
