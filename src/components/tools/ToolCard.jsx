export default function ToolCard({
  tool,
}) {

  return (
    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">

        <div>

          <h2 className="text-white text-xl font-bold">
            {tool.name}
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            {tool.provider}
          </p>

        </div>

        <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs">
          {tool.category}
        </span>

      </div>



      {/* Stats */}
      <div className="space-y-3">

        <div className="flex justify-between">

          <span className="text-gray-400">
            Monthly Price
          </span>

          <span className="text-white">
            ${tool.monthlyPrice}
          </span>

        </div>



        <div className="flex justify-between">

          <span className="text-gray-400">
            Popularity
          </span>

          <span className="text-emerald-400">
            {tool.popularityScore}
          </span>

        </div>



        <div className="flex justify-between">

          <span className="text-gray-400">
            Ethical Score
          </span>

          <span className="text-blue-400">
            {tool.ethicalScore}
          </span>

        </div>



        <div className="flex justify-between">

          <span className="text-gray-400">
            Carbon / Request
          </span>

          <span className="text-amber-400">
            {tool.carbonPerRequest}
          </span>

        </div>

      </div>

    </div>
  );
}