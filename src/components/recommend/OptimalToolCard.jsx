import { Trophy } from "lucide-react";

export default function OptimalToolCard({
  tool,
}) {

  if (!tool) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/20 rounded-2xl p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-emerald-400 text-sm font-medium">
            BEST TOOL
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">
            {tool.tool}
          </h2>

          <p className="text-gray-300 mt-2">
            Highest ranked AI tool for this workflow
          </p>

        </div>

        <div className="text-center">

          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center">

            <Trophy
              className="text-white"
              size={36}
            />

          </div>

          <p className="text-emerald-400 font-bold text-xl mt-3">
            {tool.scoreOutOf100}/100
          </p>

        </div>

      </div>

    </div>
  );
}