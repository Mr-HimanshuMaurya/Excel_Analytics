import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturesSection = () => {
  return (
    <section
        id="features-section"
        className="py-20 bg-gradient-to-b from-black to-gray-900 p-3 px-[40px] md:px-[80px]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-indigo-900 text-indigo-300 mb-4">
              POWERFUL FEATURES
            </Badge>
            <h2 className="text-4xl text-white font-bold mb-4">
              Transform your data into actionable insights
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI-powered platform helps you create stunning visualizations
              and interactive dashboards in minutes, not days.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "fas fa-file-excel",
                title: "Drag & Drop Excel Files",
                description:
                  "Just drag your Excel files onto the platform. Our smart parser automatically detects columns, data types, and suggests the best visualization options.",
              },
              {
                icon: "fas fa-chart-line",
                title: "Dynamic Chart Creation",
                description:
                  "Choose from 20+ chart types including line, bar, scatter, bubble, and 3D surface plots. Flexibly map any Excel column to X/Y axes with live preview.",
              },
              {
                icon: "fas fa-robot",
                title: "AI Data Analysis",
                description:
                  "Our AI engine analyzes your data in real-time to identify trends, outliers, and correlations. Get instant insights and smart visualization recommendations.",
              },
              {
                icon: "fas fa-lock",
                title: "Enterprise Security",
                description:
                  "Bank-level encryption and compliance with major security standards to protect your data.",
              },
              {
                icon: "fas fa-cloud",
                title: "Cloud Deployment",
                description:
                  "One-click deployment to the cloud with automatic scaling based on your traffic needs.",
              },
              {
                icon: "fas fa-users",
                title: "Collaboration",
                description:
                  "Team workspaces with version control and commenting for seamless collaboration.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-indigo-500 transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-indigo-900/50 flex items-center justify-center mb-4">
                    <i
                      className={`${feature.icon} text-2xl text-indigo-400`}
                    ></i>
                  </div>
                  <CardTitle><p className="text-white">{feature.title}</p></CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="link"
                    className="text-indigo-400 p-0 hover:text-indigo-300 cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    Learn more <i className="fas fa-arrow-right ml-2"></i>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
  );
};

export default FeaturesSection;

    // <section className="w-full bg-black bg-opacity-0">
    //   <div className="flex relative flex-col pt-14 w-full min-h-52 max-md:max-w-full">
    //     <img
    //       src="https://cdn.builder.io/api/v1/image/assets/TEMP/294a5482c386523b3b47a70f7d11e6be4adda007?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //       alt="Features background"
    //       className="object-cover absolute inset-0 size-full"
    //     />
    //     <div className="flex relative flex-col justify-center items-center px-20 py-3 bg-black bg-opacity-0 max-md:px-5 max-md:max-w-full">
    //       <div className="flex flex-col items-center max-w-full w-[631px]">
    //         <span className="flex flex-col justify-center px-0.5 py-px max-w-full text-xs text-indigo-400 bg-black bg-opacity-0 w-[122px]">
    //           <span className="px-2 py-2 bg-indigo-900 rounded-none max-md:pr-5">
    //             POWERFUL FEATURES
    //           </span>
    //         </span>
    //         <h2 className="self-stretch mt-5 text-3xl font-semibold text-neutral-200 max-md:max-w-full">
    //           Transform your data into actionable insights
    //         </h2>
    //         <p className="mt-4 text-base leading-6 text-center text-gray-500 max-md:max-w-full">
    //           Our Al-powered platform helps you create stunning visualizations
    //           and interactive
    //           <br />
    //           dashboards in minutes, not days.
    //         </p>
    //       </div>
    //     </div>
    //   </div>

    //   <div className="px-20 pt-8 pb-14 max-md:px-5 max-md:max-w-full">
    //     <div className="flex gap-5 max-md:flex-col">
    //       <div className="w-6/12 max-md:ml-0 max-md:w-full">
    //         <div className="w-full max-md:mt-10 max-md:max-w-full">
    //           <div className="pr-5 pl-0.5 max-md:max-w-full">
    //             <span className="flex flex-col justify-center p-0.5 max-w-full text-xs text-violet-400 bg-black bg-opacity-0 w-[114px]">
    //               <span className="px-2.5 py-1.5 bg-purple-900 rounded-md border border-solid border-purple-950">
    //                 INTERACTIVE DEMO
    //               </span>
    //             </span>
    //             <h3 className="mt-5 text-3xl font-semibold leading-9 text-neutral-300 max-md:max-w-full">
    //               See the power of our visualization
    //               <br /> engine
    //             </h3>
    //           </div>
    //           <p className="mt-6 text-base leading-6 text-zinc-500 max-md:mr-2.5 max-md:max-w-full">
    //             Our platform makes it easy to create beautiful, interactive data
    //             <br />
    //             visualizations that bring your data to life. Explore the demo to
    //             see
    //             <br />
    //             how you can transform your data into actionable insights.
    //           </p>

    //           <div className="flex flex-wrap gap-3 items-start mt-7">
    //             <div className="flex flex-col gap-14 max-md:gap-10">
    //               <img
    //                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca870966421823d236cdcfee6a717704352fa318?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //                 alt="Feature 1"
    //                 className="object-contain rounded-lg aspect-[0.97] w-[34px]"
    //               />
    //               <img
    //                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/512079c390efb7adc880239ed63d354c112442a5?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //                 alt="Feature 2"
    //                 className="object-contain rounded-md aspect-[0.97] w-[34px]"
    //               />
    //               <img
    //                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/f38749e474e85ddbeb66e10d774d930ed7c74928?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //                 alt="Feature 3"
    //                 className="object-contain rounded-lg aspect-[0.97] w-[34px]"
    //               />
    //             </div>
    //             <div className="flex flex-col grow shrink-0 mt-2 text-base basis-0 w-fit max-md:max-w-full">
    //               <h4 className="self-start text-neutral-400">
    //                 Smart Column Mapping
    //               </h4>
    //               <p className="mt-1.5 text-xs leading-6 text-zinc-600 max-md:max-w-full">
    //                 Automatically detect data types in your Excel columns. Drag
    //                 & drop to map
    //                 <br />
    //                 any column as X/Y axes with instant chart preview.
    //               </p>

    //               <h4 className="self-start mt-6 text-neutral-400">
    //                 Analysis History
    //               </h4>
    //               <p className="mt-3.5 mr-8 text-xs leading-5 text-neutral-600 max-md:mr-2.5">
    //                 Access your complete history of Excel uploads, generated
    //                 charts, and Al
    //                 <br />
    //                 insights. Download or share visualizations anytime.
    //               </p>

    //               <h4 className="self-start mt-6 text-neutral-400">
    //                 Al Recommendations
    //               </h4>
    //               <p className="mt-3.5 mr-10 text-xs leading-5 text-neutral-600 max-md:mr-2.5">
    //                 Get smart suggestions for chart types based on your data
    //                 structure. Al
    //                 <br />
    //                 helps identify the most meaningful correlations and
    //                 patterns.
    //               </p>
    //             </div>
    //           </div>

    //           <button className="flex flex-col justify-center px-1.5 py-1 mt-8 max-w-full text-base text-violet-300 bg-black bg-opacity-0 w-[204px]">
    //             <div className="flex relative flex-col px-5 py-3.5 aspect-[4.9] max-md:px-5">
    //               <img
    //                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/74c65761954da59598f1a6e78a9cf86b579dd2fe?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //                 alt="Button background"
    //                 className="object-cover absolute inset-0 size-full"
    //               />
    //               <span className="relative">Try Interactive Demo</span>
    //             </div>
    //           </button>
    //         </div>
    //       </div>
    //       <div className="w-6/12 max-md:ml-0 max-md:w-full">
    //         <img
    //           src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f6b84f4e4520f8779b5c25d47f99f6fb02d2277?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //           alt="Feature preview"
    //           className="object-contain self-stretch my-auto w-full aspect-[1.05] max-md:mt-10 max-md:max-w-full"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </section>