import React from "react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden px-[40px] md:px-[80px]">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-purple-900/70 z-0"></div>
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://readdy.ai/api/search-image?query=Abstract%20digital%20data%20visualization%20background%20with%20flowing%20data%20points%20and%20network%20connections%2C%20dark%20purple%20and%20blue%20gradient%20with%20glowing%20elements%2C%20futuristic%20technology%20concept%20with%20particle%20effects&width=1200&height=600&seq=cta-bg&orientation=landscape"
          alt="Abstract data background"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl text-white font-bold mb-6">
            Ready to transform your data experience?
          </h2>
          <p className="text-xl text-gray-200 mb-10">
            Join over 5 million users who are already creating stunning
            visualizations and interactive dashboards with our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-indigo-900 hover:bg-gray-100 text-lg px-8 py-6 !rounded-button whitespace-nowrap cursor-pointer">
              Start Free Trial
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 !rounded-button whitespace-nowrap cursor-pointer"
            >
              <i className="fas fa-calendar-alt mr-2"></i> Schedule Demo
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-300">
            No credit card required. Free trial includes all features for 14
            days.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

// <section className="flex relative flex-col justify-center items-center px-20 py-20 w-full min-h-[346px] max-md:px-5 max-md:max-w-full">
//   <img
//     src="https://cdn.builder.io/api/v1/image/assets/TEMP/803ff4c8094c20418eb02155c0a4cd22d1642c6b?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
//     alt="CTA background"
//     className="object-cover absolute inset-0 size-full"
//   />
//   <div className="flex relative flex-col max-w-full w-[590px]">
//     <h2 className="text-3xl font-semibold text-gray-200 max-md:max-w-full">
//       Ready to transform your data experience?
//     </h2>
//     <p className="mt-6 mr-2.5 ml-4 text-base leading-6 text-center text-gray-400 max-md:max-w-full">
//       Join over 5 million users who are already creating stunning
//       visualizations and
//       <br />
//       interactive dashboards with our platform.
//     </p>
//     <div className="flex gap-2.5 self-center mt-8 max-w-full text-sm text-slate-500 w-[359px]">
//       <button className="flex flex-col justify-center px-1.5 py-1 bg-black bg-opacity-0">
//         <span className="px-7 py-4 bg-white border border-solid border-neutral-300 max-md:px-5">
//           Start Free Trial
//         </span>
//       </button>
//       <div className="flex shrink-0 my-auto bg-white border border-solid border-zinc-300 h-[42px] w-[189px]" />
//     </div>
//     <p className="self-center mt-6 text-xs text-gray-400">
//       No credit card required. Free trial includes all features for 14 days.
//     </p>
//   </div>
// </section>
