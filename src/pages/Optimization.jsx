import {
  useEffect,
  useState,
} from "react";

import {
  BrainCircuit,
  AlertTriangle,
  DollarSign,
  CheckCircle2,
} from "lucide-react";

import SectionTitle from "../components/shared/SectionTitle";
import AIBadge from "../components/shared/AIBadge";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import StatCard from "../components/shared/StatCard";

import {
  getOptimizationInsights,
} from "../services/analyticsService";

export default function Optimization() {

  const [data, setData] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");



  useEffect(() => {

    const fetchInsights =
      async () => {

        try {

          const response =
            await getOptimizationInsights();

          setData(
            response.data
          );

        } catch (err) {

          setError(
            "Failed to fetch optimization insights"
          );

        } finally {

          setLoading(false);

        }

      };

    fetchInsights();

  }, []);




  if (loading) {
    return <LoadingSpinner />;
  }



  if (error) {
    return (
      <ErrorMessage
        message={error}
      />
    );
  }




  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <SectionTitle
          title="Optimization Insights"
          subtitle="AI-generated insights for improving AI usage efficiency"
        />

        <AIBadge />

      </div>



      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-6 mb-8">

        <StatCard
          title="Estimated Spend"
          value={`$${data.totalEstimatedSpend}`}
          subtitle="Current AI ecosystem spend"
          icon={<DollarSign />}
        />

        <StatCard
          title="Optimization Signals"
          value={
            data.recommendedActions.length
          }
          subtitle="AI-generated improvement opportunities"
          icon={<BrainCircuit />}
        />

      </div>



      {/* Insights */}
      <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mb-8">

        <h2 className="text-white text-2xl font-bold mb-6">
          AI Insights
        </h2>

        <div className="space-y-4">

          {data.insights.map(
            (insight, index) => (

              <div
                key={index}
                className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5"
              >

                <p className="text-blue-400">
                  {insight}
                </p>

              </div>

            )
          )}

        </div>

      </div>



      {/* Redundancies */}
      <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mb-8">

        <h2 className="text-white text-2xl font-bold mb-6">
          Redundancies
        </h2>

        <div className="space-y-4">

          {data.redundancies.map(
            (
              redundancy,
              index
            ) => (

              <div
                key={index}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-5"
              >

                <div className="flex items-center gap-3">

                  <AlertTriangle
                    className="text-red-400"
                  />

                  <p className="text-red-400">
                    {redundancy}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>



      {/* Cost Saving Opportunities */}
      <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mb-8">

        <h2 className="text-white text-2xl font-bold mb-6">
          Cost Saving Opportunities
        </h2>

        <div className="space-y-4">

          {data.costSavingOpportunities.map(
            (
              opportunity,
              index
            ) => (

              <div
                key={index}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5"
              >

                <div className="flex items-center gap-3">

                  <DollarSign
                    className="text-emerald-400"
                  />

                  <p className="text-emerald-400">
                    {opportunity}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>



      {/* Recommended Actions */}
      <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6">

        <h2 className="text-white text-2xl font-bold mb-6">
          Recommended Actions
        </h2>

        <div className="space-y-4">

          {data.recommendedActions.map(
            (
              action,
              index
            ) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    className="text-emerald-400"
                  />

                  <p className="text-white">
                    {action}
                  </p>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}