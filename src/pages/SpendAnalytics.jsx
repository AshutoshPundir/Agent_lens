import { useEffect, useState } from "react";

import {
  DollarSign,
  AlertTriangle,
  Layers3,
} from "lucide-react";

import SectionTitle from "../components/shared/SectionTitle";
import StatCard from "../components/shared/StatCard";
import AIBadge from "../components/shared/AIBadge";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";

import {
  getSpendAnalytics,
} from "../services/analyticsService";

import {
  getAllTools,
} from "../services/toolService";

export default function SpendAnalytics() {

  const [tools, setTools] =
    useState([]);

  const [selectedTools,
    setSelectedTools] =
    useState([]);

  const [analytics,
    setAnalytics] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");



  // Fetch Available Tools
  useEffect(() => {

    const fetchTools =
      async () => {

        try {

          const response =
            await getAllTools();

          setTools(response.data);

        } catch (err) {

          console.log(err);

        }

      };

    fetchTools();

  }, []);




  // Run Analytics
  const handleAnalyze =
    async () => {

      setLoading(true);

      setError("");

      try {

        const response =
          await getSpendAnalytics({
            subscriptions:
              selectedTools,
          });

        setAnalytics(
          response.data
        );

      } catch (err) {

        setError(
          "Failed to analyze subscriptions"
        );

      } finally {

        setLoading(false);

      }

    };




  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <SectionTitle
          title="Spend Analytics"
          subtitle="Analyze AI subscription costs and overlaps"
        />

        <AIBadge />

      </div>



      {/* Subscription Selector */}
      <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mb-8">

        <h2 className="text-white text-2xl font-bold mb-6">
          Select Subscriptions
        </h2>



        {/* Tool Selection */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          {tools.map((tool) => (

            <button
              key={tool._id}
              onClick={() => {

                if (
                  selectedTools.includes(
                    tool.name
                  )
                ) {

                  setSelectedTools(
                    selectedTools.filter(
                      (item) =>
                        item !==
                        tool.name
                    )
                  );

                } else {

                  setSelectedTools([
                    ...selectedTools,
                    tool.name,
                  ]);

                }

              }}
              className={`p-4 rounded-xl border transition ${
                selectedTools.includes(
                  tool.name
                )
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-300"
              }`}
            >

              {tool.name}

            </button>

          ))}

        </div>



        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-xl text-white"
        >

          Analyze Spend

        </button>

      </div>



      {/* Loading */}
      {loading &&
        <LoadingSpinner />
      }



      {/* Error */}
      {error && (
        <ErrorMessage
          message={error}
        />
      )}



      {/* Analytics Result */}
      {analytics && (

        <div>

          {/* Stat Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">

            <StatCard
              title="Monthly Spend"
              value={`$${analytics.monthlySpend}`}
              subtitle="Total AI subscription cost"
              icon={<DollarSign />}
            />

            <StatCard
              title="Estimated Waste"
              value={`$${analytics.estimatedWaste}`}
              subtitle="Potential savings detected"
              icon={<AlertTriangle />}
            />

            <StatCard
              title="Overlap Detected"
              value={
                analytics.overlapDetected
                  ? "Yes"
                  : "No"
              }
              subtitle="Capability duplication"
              icon={<Layers3 />}
            />

          </div>



          {/* Overlapping Tools */}
          <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mb-8">

            <h2 className="text-white text-2xl font-bold mb-6">
              Overlapping Tools
            </h2>

            <div className="space-y-4">

              {analytics.overlappingTools.map(
                (
                  overlap,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-5"
                  >

                    <h3 className="text-white font-semibold">

                      {overlap.tools.join(
                        " vs "
                      )}

                    </h3>

                    <p className="text-amber-400 mt-2">

                      Similarity:
                      {" "}
                      {
                        overlap.similarity
                      }

                    </p>

                  </div>

                )
              )}

            </div>

          </div>



          {/* Suggestions */}
          <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6">

            <h2 className="text-white text-2xl font-bold mb-6">
              Optimization Suggestions
            </h2>

            <div className="space-y-4">

              {analytics.optimizationSuggestions.map(
                (
                  suggestion,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 text-emerald-400"
                  >

                    {suggestion}

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}