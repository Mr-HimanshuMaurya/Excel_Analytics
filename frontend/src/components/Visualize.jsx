import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

const chartTypes = ["Bar", "Line", "Pie", "Doughnut", "3D Scatter", "3D Line", "3D Surface", "3D Bar"];

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
      const labels = excelData.slice(1).map((row) => row[xIndex]);
const values = excelData.slice(1).map((row) =>
  parseFloat(row[yIndex])
);

if (values.some((val) => isNaN(val))) {
  setError("Y-axis contains non-numeric values for Pie/Doughnut");
  return;
}
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
  } else if (chartType === "3D Bar") {

  let xValues = excelData.slice(1).map((row) => {
    const val = row[xIndex];
    return isNaN(val) ? headers.indexOf(val) : Number(val);
  });

  let yValues = excelData.slice(1).map((row) => {
    const val = row[yIndex];
    return isNaN(val) ? headers.indexOf(val) : Number(val);
  });

  const bars = xValues.map((xVal, idx) => {
    const yVal = idx; // Spread bars along Y
    const height = yValues[idx];
    return createCuboid(xVal, yVal, height);  // Correct
  });

  data = bars;
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
      return <Plot
    data={chartData}
    layout={{
      autosize: true,
      height: 500,
      margin: { l: 0, r: 0, b: 0, t: 30 },
      title: generatedChart,
      scene: {
        aspectmode: "cube",
        xaxis: { title: xAxis },
        yaxis: { title: yAxis },
        zaxis: { title: "Auto Z" },
      },
    }}
  />
    }
  };

  const isAxesSelectionEnabled = () =>
    excelData && chartType && !["Pie", "Doughnut"].includes(chartType);


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



  // Build a cuboid mesh at (x, y, 0) with height z and width/depth size
const createCuboid = (x, y, z, width = 0.4, depth = 0.4) => {
  const hw = width / 2;
  const hd = depth / 2;

  const vertices = [
    [x - hw, y - hd, 0],    // 0: bottom front left
    [x + hw, y - hd, 0],    // 1: bottom front right
    [x + hw, y + hd, 0],    // 2: bottom back right
    [x - hw, y + hd, 0],    // 3: bottom back left
    [x - hw, y - hd, z],    // 4: top front left
    [x + hw, y - hd, z],    // 5: top front right
    [x + hw, y + hd, z],    // 6: top back right
    [x - hw, y + hd, z],    // 7: top back left
  ];

  // Each face defined by vertices indices (triangles)
  const i = [
    0, 0, 0, 4, 4, 7, 3, 3, 1, 5, 6, 6,
  ];
  const j = [
    1, 3, 4, 5, 7, 4, 2, 7, 5, 6, 2, 1,
  ];
  const k = [
    3, 7, 5, 6, 3, 0, 7, 4, 6, 2, 3, 0,
  ];

  // Plotly mesh3d needs flat arrays for x,y,z
  const xArr = vertices.map((v) => v[0]);
  const yArr = vertices.map((v) => v[1]);
  const zArr = vertices.map((v) => v[2]);

  return {
    type: "mesh3d",
    x: xArr,
    y: yArr,
    z: zArr,
    i,
    j,
    k,
    opacity: 0.9,
    color: "#17BECF",
  };
};



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



{/* Chart Display */}

 {generatedChart && (

        <div
           
          className="relative "
        >
        
            <div className="absolute top-2 right-2 flex flex-wrap gap-1 z-10">
              <button
                onClick={downloadChartAsPNG}
                className="px-2 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
              >
                Download PNG
              </button>
              <button
                onClick={downloadChartAsPDF}
                className="px-2 py-1 text-xs bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md transition"
              >
                Download PDF
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-2 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md transition"
              >
                Generate AI Analysis
              </button>
            </div>
        </div>
       )}

          {/* //  Generate Chart */}
        <div
        id="chart-container"
         className="bg-white rounded-2xl shadow-2xl p-8 h-[600px]  flex justify-center items-center">
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
    </>
  );
};

export default Visualize;
