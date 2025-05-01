import React from "react";
import TestimonialCard from "./TestimonialCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TestimonialsSection = () => {
  // const testimonials = [
  //   {
  //     rating: [
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/5cdc2171330fce68798dcea0785280545b874923?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/83b6edb06f2b717c636ae1b2758c43053eaa5677?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/fcfe71e855e569eb417ae8b9ce37ae91efdd3a3b?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/d2e0fd3564a3e3047f7ac49a06673eaa9ea159f0?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/8d69acd740e3b3f3454348a1bb92f53d6173eb69?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //     ],
  //     content:
  //       '"This platform has completely transformed how we analyze and present data to our clients. The Al recommendations save us hours of work every week."',
  //     author: "Sarah Johnson",
  //     role: "Data Analyst, TechCorp",
  //     avatar:
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/a3d3883b7d2b66b36c03d2b4f68afa14bd140783?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //   },
  //   {
  //     rating: [
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/eca19f7fe951250e5cfb79af3edc6da7225ce19a?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/83b6edb06f2b717c636ae1b2758c43053eaa5677?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/449edfd6b231529765a9900995af646e61e239a2?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/6eb28696a4719b3ff489b0b0bb5034ef1ba76d7e?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/2ceb82054874ecb275d79db8550d4c0e4a657ba7?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //     ],
  //     content:
  //       '"The ease of use combined with powerful visualization capabilities makes this the perfect tool for both our technical and non-technical team members."',
  //     author: "Michael Chen",
  //     role: "CTO, DataDrive Inc.",
  //     avatar:
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/bed7a057160b1e1b6bd21a0cddaf15612cbfe78a?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //   },
  //   {
  //     rating: [
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/a733bd06fc9c0988c5d404caa9283ef78be955d5?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/fcfe71e855e569eb417ae8b9ce37ae91efdd3a3b?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/eca19f7fe951250e5cfb79af3edc6da7225ce19a?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/fcfe71e855e569eb417ae8b9ce37ae91efdd3a3b?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/27280f2126f0c0fc46024d2987d3775fb99d2d3c?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //     ],
  //     content:
  //       '"We\'ve reduced our dashboard development time by 70% while improving the quality and interactivity of our visualizations. Absolutely game-changing."',
  //     author: "Emma Rodriguez",
  //     role: "BI Director, Global Finance",
  //     avatar:
  //       "https://cdn.builder.io/api/v1/image/assets/TEMP/9060fb5d35f1429ebc9e52fc62289e959a909557?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf",
  //   },
  // ];

  return (
    <section
        id="testimonials-section"
        className="py-20 bg-gradient-to-b from-gray-900 to-black p-3 px-[40px] md:px-[80px]"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-indigo-900 text-indigo-300 mb-4">
              TESTIMONIALS
            </Badge>
            <h2 className="text-4xl text-white font-bold mb-4">
              Trusted by data professionals worldwide
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              See what our customers are saying about how our platform has
              transformed their data workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This platform has completely transformed how we analyze and present data to our clients. The AI recommendations save us hours of work every week.",
                author: "Sarah Johnson",
                role: "Data Analyst, TechCorp",
                logo: "fas fa-building",
              },
              {
                quote:
                  "The ease of use combined with powerful visualization capabilities makes this the perfect tool for both our technical and non-technical team members.",
                author: "Michael Chen",
                role: "CTO, DataDrive Inc.",
                logo: "fas fa-laptop-code",
              },
              {
                quote:
                  "We've reduced our dashboard development time by 70% while improving the quality and interactivity of our visualizations. Absolutely game-changing.",
                author: "Emma Rodriguez",
                role: "BI Director, Global Finance",
                logo: "fas fa-chart-pie",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <i key={i} className="fas fa-star text-sm mr-1"></i>
                      ))}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <i className={`${testimonial.logo} text-indigo-400`}></i>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h3 className="text-2xl text-white font-semibold mb-8">
              Trusted by leading companies
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {[
                { icon: "fab fa-microsoft", name: "Microsoft" },
                { icon: "fab fa-amazon", name: "Amazon" },
                { icon: "fab fa-google", name: "Google" },
                { icon: "fab fa-spotify", name: "Spotify" },
                { icon: "fab fa-slack", name: "Slack" },
              ].map((company, index) => (
                <div
                  key={index}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <i className={`${company.icon} text-3xl mr-2`}></i>
                  <span className="text-xl font-medium">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default TestimonialsSection;

    // <section className="flex relative flex-col items-center pb-16 w-full min-h-[644px] max-md:max-w-full">
    //   <img
    //     src="https://cdn.builder.io/api/v1/image/assets/TEMP/a015863b153cf78e178cba867ebf3dac8536c5fc?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //     alt="Testimonials background"
    //     className="object-cover absolute inset-0 size-full"
    //   />
    //   <div className="relative flex flex-col items-center self-stretch px-20 pt-3.5 pb-9 bg-black bg-opacity-0 max-md:px-5 max-md:max-w-full">
    //     <div className="flex flex-col max-w-full w-[630px]">
    //       <span className="flex flex-col justify-center self-center px-px py-0.5 text-xs text-indigo-400 whitespace-nowrap bg-black bg-opacity-0 w-[90px]">
    //         <span className="px-2 py-2 bg-indigo-900 rounded-md border border-solid border-indigo-950 max-md:pr-5">
    //           TESTIMONIALS
    //         </span>
    //       </span>
    //       <h2 className="mt-5 mr-8 ml-7 text-3xl font-semibold text-neutral-200 max-md:mr-2.5 max-md:max-w-full">
    //         Trusted by data professionals worldwide
    //       </h2>
    //       <p className="mt-4 text-base leading-6 text-center text-gray-500 max-md:max-w-full">
    //         See what our customers are saying about how our platform has
    //         transformed their data
    //         <br />
    //         workflows.
    //       </p>
    //     </div>
    //   </div>

    //   <div className="relative mt-4 w-full max-w-[1054px] max-md:max-w-full">
    //     <div className="flex gap-5 max-md:flex-col">
    //       {testimonials.map((testimonial, index) => (
    //         <div key={index} className="w-[33%] max-md:ml-0 max-md:w-full">
    //           <TestimonialCard {...testimonial} />
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <h3 className="relative mt-14 text-xl font-medium text-neutral-300 max-md:mt-10">
    //     Trusted by leading companies
    //   </h3>

    //   <div className="flex relative flex-wrap gap-5 justify-between items-start mt-8 max-w-full text-base whitespace-nowrap w-[593px]">
    //     <div className="flex gap-1.5 text-gray-500">
    //       <img
    //         src="https://cdn.builder.io/api/v1/image/assets/TEMP/04adf73bd02ec2fe7753a9f7b83ad72657ff2157?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //         alt="Microsoft logo"
    //         className="object-contain shrink-0 aspect-square w-[23px]"
    //       />
    //       <span className="my-auto">Microsoft</span>
    //     </div>
    //     <div className="flex gap-1.5 text-base text-gray-500">
    //       <img
    //         src="https://cdn.builder.io/api/v1/image/assets/TEMP/75f3efa43cd0334d4858309292c96adb23a3d116?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //         alt="Amazon logo"
    //         className="object-contain shrink-0 aspect-square w-[23px]"
    //       />
    //       <span className="my-auto">Amazon</span>
    //     </div>
    //     <div className="flex gap-1.5 font-medium text-gray-500">
    //       <img
    //         src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fc4b402a1709ff01287df03b9c608313ad38aea?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //         alt="Google logo"
    //         className="object-contain shrink-0 aspect-square w-[25px]"
    //       />
    //       <span>Google</span>
    //     </div>
    //     <div className="flex gap-1.5 self-stretch text-gray-500">
    //       <img
    //         src="https://cdn.builder.io/api/v1/image/assets/TEMP/dbbf12dd8978315dcf620741896076c403b65c2f?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //         alt="Spotify logo"
    //         className="object-contain shrink-0 aspect-square w-[26px]"
    //       />
    //       <span>Spotify</span>
    //     </div>
    //     <div className="flex gap-1.5 text-gray-500">
    //       <img
    //         src="https://cdn.builder.io/api/v1/image/assets/TEMP/d878d4902ae912d757f22284afe2c02d52903ef6?placeholderIfAbsent=true&apiKey=b8e0317e302d4d7c8d561389c5d9ddbf"
    //         alt="Slack logo"
    //         className="object-contain shrink-0 aspect-square w-[23px]"
    //       />
    //       <span className="my-auto">Slack</span>
    //     </div>
    //   </div>
    // </section>