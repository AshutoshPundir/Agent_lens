import {
  LayoutDashboard,
  Wrench,
  Sparkles,
  BarChart3,
  BrainCircuit,
  Users,
  ShieldCheck,
  Building2,
  Moon,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Tools",
      path: "/tools",
      icon: <Wrench size={20} />,
    },
    {
      name: "Recommend",
      path: "/recommend",
      icon: <Sparkles size={20} />,
    },
    {
      name: "Spend Analytics",
      path: "/analytics/spend",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Optimization",
      path: "/analytics/optimization",
      icon: <BrainCircuit size={20} />,
    },
    {
      name: "Team Analytics",
      path: "/analytics/team/Engineering",
      icon: <Users size={20} />,
    },
    {
      name: "Governance",
      path: "/governance",
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "Organization",
      path: "/organization",
      icon: <Building2 size={20} />,
    },
  ];

  return (
    <aside className="w-[260px] min-h-screen bg-[#0B1120] border-r border-white/10 flex flex-col justify-between p-5">
      
      {/* Top Section */}
      <div>
        
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            AlgoLens
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            AI Optimization Platform
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                 
                 ${
                   isActive
                     ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                     : "text-gray-300 hover:bg-white/5 hover:text-white"
                 }`
              }
            >
              {item.icon}

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 pt-5">
        
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200">
          
          <Moon size={20} />

          <span className="text-sm font-medium">
            Dark Mode
          </span>
        </button>

      </div>
    </aside>
  );
}