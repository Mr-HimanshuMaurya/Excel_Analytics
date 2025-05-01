import React, { useEffect, useState } from "react";
// import * as echarts from "echarts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      title: "Welcome to DataViz",
      description:
        "Let's take a quick tour of our powerful data visualization platform.",
      element: "hero-section",
    },
    {
      title: "Powerful Features",
      description:
        "Explore our AI-powered features that help you create stunning visualizations in minutes.",
      element: "features-section",
    },
    {
      title: "Interactive Demo",
      description:
        "Try our interactive demo to see how easy it is to transform your data into beautiful visualizations.",
      element: "demo-section",
    },
    {
      title: "Customer Success Stories",
      description:
        "See how other companies are using DataViz to transform their data workflows.",
      element: "testimonials-section",
    },
  ];

  const startTour = () => {
    setCurrentStep(0);
    setShowTour(true);
    highlightElement(tourSteps[0].element);
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      const nextIndex = currentStep + 1;
      setCurrentStep(nextIndex);
      highlightElement(tourSteps[nextIndex].element);
    } else {
      endTour();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      const prevIndex = currentStep - 1;
      setCurrentStep(prevIndex);
      highlightElement(tourSteps[prevIndex].element);
    }
  };

  const endTour = () => {
    setShowTour(false);
    setCurrentStep(0);
    removeHighlight();
  };

  const highlightElement = (elementId) => {
    removeHighlight();
    const element = document.getElementById(elementId);
    if (element) {
      element.style.position = "relative";
      element.style.zIndex = "60";
      element.style.boxShadow = "0 0 0 9999px rgba(0, 0, 0, 0.75)";
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const removeHighlight = () => {
    document.querySelectorAll("section").forEach((section) => {
      section.style.position = "";
      section.style.zIndex = "";
      section.style.boxShadow = "";
    });
  };

  useEffect(() => {
    return () => {
      removeHighlight();
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header
        className={`fixed top-0 p-3 px-5 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-sm shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center">
            <div className="mr-8">
              <div className="flex items-center">
                <div className="text-3xl font-bold">
                  <i className="fas fa-chart-bar mr-2"></i>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    dataviz
                  </span>
                </div>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-sm font-medium hover:text-indigo-400 transition-colors"
              >
                Product <i className="fas fa-chevron-down text-xs ml-1"></i>
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-indigo-400 transition-colors"
              >
                Docs <i className="fas fa-chevron-down text-xs ml-1"></i>
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-indigo-400 transition-colors"
              >
                Example Apps
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-indigo-400 transition-colors"
              >
                Resources <i className="fas fa-chevron-down text-xs ml-1"></i>
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-indigo-400 transition-colors"
              >
                Solutions <i className="fas fa-chevron-down text-xs ml-1"></i>
              </a>
              <a
                href="#"
                className="text-sm font-medium hover:text-indigo-400 transition-colors"
              >
                Pricing
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="text-white border-gray-700 hover:bg-gray-800 !rounded-button whitespace-nowrap cursor-pointer"
              onClick={startTour}
            >
              TAKE A TOUR
            </Button>

            <Dialog open={showTour} onOpenChange={setShowTour}>
              <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    {tourSteps[currentStep].title}
                  </DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-300 mb-4">
                    {tourSteps[currentStep].description}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                      {tourSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentStep
                              ? "bg-indigo-500"
                              : "bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-800 !rounded-button whitespace-nowrap"
                        onClick={previousStep}
                        disabled={currentStep === 0}
                      >
                        <i className="fas fa-arrow-left mr-2"></i> Previous
                      </Button>
                      <Button
                        className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap"
                        onClick={nextStep}
                      >
                        {currentStep === tourSteps.length - 1
                          ? "Finish"
                          : "Next"}
                        {currentStep < tourSteps.length - 1 && (
                          <i className="fas fa-arrow-right ml-2"></i>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-indigo-600 hover:bg-indigo-700 !rounded-button whitespace-nowrap cursor-pointer">
              GET A DEMO
            </Button>
            <button className="hidden md:flex p-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </header>
  );
};

export default Header;

    // <nav class="bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-200">
    //   <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <a
    //       href="#"
    //       class="flex items-center space-x-3 rtl:space-x-reverse"
    //     >
    //       <img
    //         src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3b7313c8a45768c8ab41de1598d463bbafd0a48?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //         alt="Dataviz logo"
    //         className="object-contain shrink-0 aspect-[1.17] w-[27px]"
    //       />
    //       <span class="self-center text-2xl font-semibold whitespace-nowrap text-violet-700">
    //         DataViz
    //       </span>
    //     </a>
    //     <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse gap-2">
    //       <button
    //         type="button"
    //         className="text-black bg-white! hover:bg-gray-300! focus:outline-none!"
    //       >
    //         Take a Tour
    //       </button>
    //       <button
    //         type="button"
    //         class="text-white bg-blue-700! hover:bg-blue-800! focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //       >
    //         Get a Demo
    //       </button>
    //     </div>
    //   </div>
    // </nav>

// <div className="flex gap-1.5 self-start mt-2.5 text-2xl font-semibold text-violet-700 whitespace-nowrap">
//         <img
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3b7313c8a45768c8ab41de1598d463bbafd0a48?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
//           alt="Dataviz logo"
//           className="object-contain shrink-0 aspect-[1.17] w-[27px]"
//         />
//         <h1>dataviz</h1>
//       </div>
//       <div className="flex gap-2.5 items-center">
//         <button className="self-stretch px-px my-auto text-sm text-center text-black bg-black bg-opacity-0">
//           <div className="flex flex-col justify-center p-px rounded border border-solid bg-slate-900 border-slate-900">
//             <span className="px-3 py-3 bg-white rounded-sm border border-gray-600 border-solid">
//               Take a Tour
//             </span>
//           </div>
//         </button>
//         <button className="flex flex-col justify-center self-stretch p-1 text-xs text-white bg-black bg-opacity-0">
//           <span className="p-3 bg-indigo-600 rounded-sm border border-indigo-900 border-solid">
//             GET A DEMO
//           </span>
//         </button>
//         <img
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce2327fc4ab0cef5988ca2b99fc3a1c4f2f4bc91?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
//           alt="Menu"
//           className="object-contain shrink-0 self-stretch my-auto aspect-[1.07] w-[15px]"
//         />
//       </div>
