// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Hero() {
//   const containerRef = useRef(null);
//   const dashboardRef = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // dashboard scale animation
//       gsap.timeline({
//         scrollTrigger: {
//           trigger: ".hero-container",
//           start: "top top",
//           end: "+=700",
//           scrub: 1,
//           pin: true,
//         },
//       })

//       // dashboard animation
//       .fromTo(
//         ".dashboard-card",
//         {
//           scale: 0.7,
//           opacity: 0,
//           y: 120,
//           rotateX: 20,
//         },
//         {
//           scale: 1,
//           opacity: 1,
//           y: 0,
//           rotateX: 0,
//           ease: "power3.out",
//         }
//       )

//       // heading fade
//       .fromTo(
//         ".hero-text",
//         {
//           opacity: 1,
//         },
//         {
//           opacity: 0.3,
//         },
//         0
//       );

//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="hero-container relative min-h-screen overflow-hidden bg-[#0B0F19] text-white"
//       style={{
//         backgroundImage:
//           "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
//         backgroundSize: "24px 24px",
//       }}
//     >
//       {/* background glow */}
//       <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[120px]" />

//       {/* navbar */}
//       <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10">
//         <h1 className="text-xl font-semibold tracking-tight">
//           Agent<span className="text-blue-400">Lens</span>
//         </h1>

//         <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md transition hover:bg-white/10">
//           Login
//         </button>
//       </nav>

//       {/* hero content */}
//       <section className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        
//         {/* text */}
//         <div className="hero-text">
//           {/* badge */}
//           <div className="mb-6 inline-flex rounded-full border border-blue-400/15 bg-blue-400/10 px-4 py-2 text-sm text-blue-300 backdrop-blur-md">
//             Optimize your AI subscriptions
//           </div>

//           {/* heading */}
//           <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-3px] text-white md:text-7xl">
//             Stop overpaying
//             <br />
//             for AI tools.
//           </h1>

//           {/* subtext */}
//           <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400 md:text-xl">
//             AgentLens analyzes your AI stack, detects wasted
//             spending, and recommends the best value-per-token setup.
//           </p>

//           {/* buttons */}
//           <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
//             <button className="rounded-2xl bg-blue-500 px-6 py-3 font-medium text-white transition hover:bg-blue-400">
//               Start Free Analysis
//             </button>

//             <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-gray-300 transition hover:bg-white/10">
//               Watch Demo
//             </button>
//           </div>
//         </div>

//         {/* dashboard */}
//         <div
//           ref={dashboardRef}
//           className="dashboard-card relative mt-20 w-full max-w-5xl perspective-[2000px]"
//         >
//           {/* glow */}
//           <div className="absolute inset-0 bg-blue-500/10 blur-3xl" />

//           {/* card */}
//           <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#111827]/70 shadow-2xl backdrop-blur-2xl">
            
//             {/* top bar */}
//             <div className="flex items-center gap-2 border-b border-white/5 px-5 py-4">
//               <div className="h-3 w-3 rounded-full bg-red-400/70" />
//               <div className="h-3 w-3 rounded-full bg-yellow-400/70" />
//               <div className="h-3 w-3 rounded-full bg-green-400/70" />
//             </div>

//             {/* dashboard body */}
//             <div className="grid gap-4 p-6 md:grid-cols-3">
              
//               {/* subscriptions */}
//               <div className="space-y-4">
                
//                 <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-4">
//                   <p className="text-sm text-gray-300">
//                     ChatGPT Plus
//                   </p>

//                   <div className="mt-3 h-2 rounded-full bg-white/5">
//                     <div className="h-2 w-[25%] rounded-full bg-red-400" />
//                   </div>
//                 </div>

//                 <div className="rounded-2xl border border-orange-500/10 bg-orange-500/5 p-4">
//                   <p className="text-sm text-gray-300">
//                     Claude Pro
//                   </p>

//                   <div className="mt-3 h-2 rounded-full bg-white/5">
//                     <div className="h-2 w-[70%] rounded-full bg-orange-400" />
//                   </div>
//                 </div>
//               </div>

//               {/* graph */}
//               <div className="rounded-2xl bg-[#0B1220] p-5 md:col-span-2">
                
//                 <div className="mb-6 flex items-center justify-between">
//                   <p className="text-sm text-gray-400">
//                     Weekly token usage
//                   </p>

//                   <div className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
//                     Save 38%
//                   </div>
//                 </div>

//                 {/* graph bars */}
//                 <div className="flex h-40 items-end gap-3">
//                   <div className="h-14 w-full rounded-t bg-blue-500/30" />
//                   <div className="h-20 w-full rounded-t bg-blue-500/40" />
//                   <div className="h-16 w-full rounded-t bg-blue-500/30" />
//                   <div className="h-28 w-full rounded-t bg-blue-500/60" />
//                   <div className="h-24 w-full rounded-t bg-blue-500/40" />
//                   <div className="h-36 w-full rounded-t bg-cyan-400/90" />
//                 </div>

//                 {/* recommendation */}
//                 <div className="mt-6 flex items-center justify-between rounded-2xl border border-green-500/10 bg-green-500/5 p-4">
                  
//                   <div>
//                     <p className="text-sm text-gray-400">
//                       Recommended stack
//                     </p>

//                     <h3 className="mt-1 font-medium text-white">
//                       Claude + Gemini
//                     </h3>
//                   </div>

//                   <p className="text-sm font-medium text-green-400">
//                     Save $32/mo
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }