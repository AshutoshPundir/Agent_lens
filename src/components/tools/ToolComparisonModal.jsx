import {
  X,
  Trophy,
} from "lucide-react";

export default function ToolComparisonModal({
  open,
  onClose,
  comparison,
}) {

  if (!open || !comparison) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">

      <div className="bg-[#0F172A] border border-white/10 rounded-3xl w-full max-w-4xl p-8 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white"
        >

          <X size={24} />

        </button>



        {/* Header */}
        <div className="mb-8">

          <p className="text-emerald-400 text-sm font-medium">
            AI COMPARISON
          </p>

          <h2 className="text-3xl font-bold text-white mt-2">

            {comparison.tools[0].name}
            {" "}vs{" "}
            {comparison.tools[1].name}

          </h2>

        </div>



        {/* Winner */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-8 flex items-center justify-between">

          <div>

            <p className="text-emerald-400 text-sm">
              WINNER
            </p>

            <h3 className="text-2xl font-bold text-white mt-2">
              {
                comparison.analysis.winner
              }
            </h3>

            <p className="text-gray-300 mt-2">
              {
                comparison.analysis.summary
              }
            </p>

          </div>

          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center">

            <Trophy
              className="text-white"
              size={36}
            />

          </div>

        </div>



        {/* Comparison Breakdown */}
        <div className="space-y-4">

          {Object.entries(
            comparison.analysis.comparison
          ).map(
            ([category, details]) => (

              <div
                key={category}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <h4 className="text-white text-lg font-semibold capitalize">
                      {category}
                    </h4>

                    <p className="text-gray-400 mt-1">
                      {details.reason}
                    </p>

                  </div>

                  <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl text-sm font-medium">

                    {details.winner}

                  </span>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}