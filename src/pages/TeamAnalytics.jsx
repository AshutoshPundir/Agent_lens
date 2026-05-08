import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  DollarSign,
  Workflow,
} from "lucide-react";

import SectionTitle from "../components/shared/SectionTitle";
import AIBadge from "../components/shared/AIBadge";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import EmptyState from "../components/shared/EmptyState";
import StatCard from "../components/shared/StatCard";

import ToolUsageChart from "../components/charts/ToolUsageChart";

import {
  getTeamAnalytics,
} from "../services/analyticsService";

export default function TeamAnalytics() {

  const [data, setData] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  const [error,
    setError] =
    useState("");



  useEffect(() => {

    const fetchTeamData =
      async () => {

        try {

          const response =
            await getTeamAnalytics(
              "Engineering"
            );

          setData(
            response.data
          );

        } catch (err) {

          setError(
            "Failed to fetch team analytics"
          );

        } finally {

          setLoading(false);

        }

      };

    fetchTeamData();

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



  if (!data) {
    return (
      <EmptyState
        title="No Team Data"
        description="No analytics found for this team."
      />
    );
  }




  // Convert Tool Usage for Chart
  const chartData =
    Object.entries(
      data.toolUsage
    ).map(
      ([name, value]) => ({
        name,
        value,
      })
    );




  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <SectionTitle
          title={`${data.teamName} Team Analytics`}
          subtitle="Monitor workflows, spend, and AI usage"
        />

        <AIBadge />

      </div>



      {/* Overview Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

        <StatCard
          title="Total Workflows"
          value={data.totalWorkflows}
          subtitle="Executed AI workflows"
          icon={<Workflow />}
        />

        <StatCard
          title="Total Spend"
          value={`$${data.totalSpend}`}
          subtitle="AI infrastructure spend"
          icon={<DollarSign />}
        />

        <StatCard
          title="Unique Tools"
          value={
            Object.keys(
              data.toolUsage
            ).length
          }
          subtitle="Tools actively used"
          icon={<Users />}
        />

      </div>



      {/* Tool Usage Chart */}
      <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mb-8">

        <h2 className="text-white text-2xl font-bold mb-6">
          Tool Usage Distribution
        </h2>

        <ToolUsageChart
          data={chartData}
        />

      </div>



      {/* Workflow History */}
      <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-white text-2xl font-bold">
            Workflow History
          </h2>

          <span className="text-gray-400 text-sm">
            {data.analytics.length}
            {" "}
            records
          </span>

        </div>



        {data.analytics.length === 0 ? (

          <EmptyState
            title="No Workflow History"
            description="No workflows executed yet."
          />

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="text-left text-gray-400 border-b border-white/10">

                  <th className="pb-4">
                    Task
                  </th>

                  <th className="pb-4">
                    Tools Used
                  </th>

                  <th className="pb-4">
                    Optimal Tool
                  </th>

                  <th className="pb-4">
                    Cost
                  </th>

                  <th className="pb-4">
                    Priority
                  </th>

                  <th className="pb-4">
                    Date
                  </th>

                </tr>

              </thead>



              <tbody>

                {data.analytics.map(
                  (
                    workflow,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="border-b border-white/5 text-white"
                    >

                      <td className="py-4">
                        {
                          workflow.task
                        }
                      </td>

                      <td className="py-4">
                        {workflow.toolsUsed.join(
                          ", "
                        )}
                      </td>

                      <td className="py-4 text-emerald-400">
                        {
                          workflow.optimalTool
                        }
                      </td>

                      <td className="py-4">
                        $
                        {
                          workflow.estimatedCost
                        }
                      </td>

                      <td className="py-4">
                        {
                          workflow.priority
                        }
                      </td>

                      <td className="py-4">
                        {new Date(
                          workflow.createdAt
                        ).toLocaleDateString()}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}