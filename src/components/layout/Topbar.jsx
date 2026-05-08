import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-[80px] border-b border-white/10 bg-[#0F172A] px-8 flex items-center justify-between">
      
      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Welcome back to AlgoLens
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
          
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
          />
        </div>

        {/* Notification */}
        <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/10 transition">
          
          <Bell size={20} />
        </button>

        {/* Profile */}
        <button className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
          
          <UserCircle2 size={22} />
        </button>

      </div>
    </header>
  );
}