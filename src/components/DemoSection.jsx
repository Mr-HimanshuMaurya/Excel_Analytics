import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import * as echarts from "echarts";

const DemoSection = () => {

    useEffect(() => {
        const chartDom = document.getElementById("main-chart");
        if (chartDom) {
          const myChart = echarts.init(chartDom);
          const option = {
            animation: false,
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
              },
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            xAxis: [
              {
                type: "category",
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                axisTick: {
                  alignWithLabel: true,
                },
              },
            ],
            yAxis: [
              {
                type: "value",
              },
            ],
            series: [
              {
                name: "Data Points",
                type: "bar",
                barWidth: "60%",
                data: [10, 52, 200, 334, 390, 330],
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#6366f1" },
                    { offset: 1, color: "#a855f7" },
                  ]),
                },
              },
            ],
          };
          myChart.setOption(option);
          const handleResize = () => {
            myChart.resize();
          };
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
            myChart.dispose();
          };
        }
      }, []);

  return (
    <section id="demo-section" className="py-20 bg-black p-3 px-[40px] md:px-[80px]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="bg-purple-900 text-purple-300 mb-4">
              INTERACTIVE DEMO
            </Badge>
            <h2 className="text-4xl text-white font-bold mb-6">
              See the power of our visualization engine
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Our platform makes it easy to create beautiful, interactive data
              visualizations that bring your data to life. Explore the demo to
              see how you can transform your data into actionable insights.
            </p>
            <div className="space-y-6">
              {[
                {
                  icon: "fas fa-table",
                  title: "Smart Column Mapping",
                  description:
                    "Automatically detect data types in your Excel columns. Drag & drop to map any column as X/Y axes with instant chart preview.",
                },
                {
                  icon: "fas fa-history",
                  title: "Analysis History",
                  description:
                    "Access your complete history of Excel uploads, generated charts, and AI insights. Download or share visualizations anytime.",
                },
                {
                  icon: "fas fa-brain",
                  title: "AI Recommendations",
                  description:
                    "Get smart suggestions for chart types based on your data structure. AI helps identify the most meaningful correlations and patterns.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mr-4 flex-shrink-0">
                    <i className={`${item.icon} text-white`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-6 !rounded-button whitespace-nowrap cursor-pointer">
                Try Interactive Demo
              </Button>
            </div>
          </div>
          <div className="bg-gray-900 rounded-xl p-6 shadow-2xl border border-gray-800">
            <Tabs defaultValue="chart" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="chart"
                  className="data-[state=active]:bg-indigo-600! bg-white! cursor-pointer"
                >
                  Chart
                </TabsTrigger>
                <TabsTrigger
                  value="data"
                  className="data-[state=active]:bg-indigo-600! bg-white! cursor-pointer"
                >
                  Data
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="data-[state=active]:bg-indigo-600! bg-white! cursor-pointer"
                >
                  Code
                </TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <div className="bg-gray-800 rounded-lg p-4 h-[400px]">
                  <div id="main-chart" className="w-full h-full"></div>
                </div>
                <div className="mt-4 flex gap-4">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-download mr-2"></i> Export
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    <i className="fas fa-share mr-2"></i> Share
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 ml-auto !rounded-button whitespace-nowrap cursor-pointer">
                    <i className="fas fa-magic mr-2"></i> Enhance with AI
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="data">
                <div className="bg-gray-800 rounded-lg p-4 h-[400px] overflow-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left p-2">Month</th>
                        <th className="text-left p-2">Value</th>
                        <th className="text-left p-2">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { month: "Jan", value: 10, growth: "-" },
                        { month: "Feb", value: 52, growth: "+420%" },
                        { month: "Mar", value: 200, growth: "+284%" },
                        { month: "Apr", value: 334, growth: "+67%" },
                        { month: "May", value: 390, growth: "+16%" },
                        { month: "Jun", value: 330, growth: "-15%" },
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="p-2">{row.month}</td>
                          <td className="p-2">{row.value}</td>
                          <td
                            className={`p-2 ${
                              row.growth.startsWith("+")
                                ? "text-green-400"
                                : row.growth === "-"
                                ? "text-gray-500"
                                : "text-red-400"
                            }`}
                          >
                            {row.growth}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="code">
                <div className="bg-gray-800 rounded-lg p-4 h-[400px] overflow-auto">
                  <pre className="text-sm text-gray-300 font-mono">
                  {`// Sample code for creating this chart
                    const option = {
                    tooltip: {
                    trigger: 'axis',
                    axisPointer: { type: 'shadow' }
                    },
                    grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                    },
                    xAxis: [{
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    axisTick: { alignWithLabel: true }
                    }],
                    yAxis: [{ type: 'value' }],
                    series: [{
                    name: 'Data Points',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330],
                    itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                    { offset: 0, color: '#6366f1' },
                    { offset: 1, color: '#a855f7' }
                    ]
                    )
                    }
                    }]
                    };`}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
