import {
  DollarSign,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import SectionTitle from "../components/shared/SectionTitle";
import StatCard from "../components/shared/StatCard";
import AIBadge from "../components/shared/AIBadge";
import ToolUsageChart from "../components/charts/ToolUsageChart";

import { useEffect, useState } from "react";
import {
  getExecutiveAnalytics,
  getUsageAnalytics,
  getCarbonAnalytics,
} from "../services/analyticsService";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import EmptyState from "../components/shared/EmptyState";

export default function Dashboard() {

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [usageData, setUsageData] = useState([]);
    const [carbonData, setCarbonData] = useState(null);

    
    useEffect(() => {
        
        const fetchAnalytics = async () => {
            
            try {
                
                const data = await getExecutiveAnalytics();
                setAnalytics(data.data);
                
                const usage = await getUsageAnalytics();
        setUsageData(usage.data);

                const carbon = await getCarbonAnalytics();

setCarbonData(carbon.data);
        
        } catch (err) {
            
            setError("Failed to fetch analytics");

        } finally {

            setLoading(false);

        }
        
    };
    
    fetchAnalytics();
    
}, []);

// STEP 5 → LOADING STATE
if (loading) {
    return <LoadingSpinner />;
}

// STEP 6 → ERROR STATE
if (error) {
    return <ErrorMessage message={error} />;
}

    const toolUsageMap = {};

  usageData.forEach((workflow) => {

  workflow.toolsUsed.forEach((tool) => {

    toolUsageMap[tool] =
      (toolUsageMap[tool] || 0) + 1;

  });

});

const chartData = Object.entries(
  toolUsageMap
).map(([name, value]) => ({
  name,
  value,
}));

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        
        <SectionTitle
          title="Executive Overview"
          subtitle="Monitor AI usage, spend, and optimization insights"
        />

        <AIBadge />

      </div>

      {/* Stats Row */}
      {/* Stats Row */}
      <StatCard
  title="Health Score"
  value={`${analytics?.healthScore || 0}%`}
  subtitle="AI ecosystem efficiency"
  icon={<ShieldCheck />}
/>

<StatCard
  title="Monthly Spend"
  value={`$${analytics?.totalAISpend || 0}`}
  subtitle="Across all AI tools"
  icon={<DollarSign />}
/>

<StatCard
  title="Estimated Savings"
  value={`$${analytics?.estimatedSavings || 0}`}
  subtitle="Optimization opportunities"
  icon={<TrendingUp />}
/>

<StatCard
  title="Risk Alerts"
  value={analytics?.risks?.length || 0}
  subtitle="Potential issues detected"
  icon={<AlertTriangle />}
/>

      {/* Charts Section */}
<div className="grid grid-cols-2 gap-6 mt-8">

  <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6">
    
    <h3 className="text-white text-lg font-semibold mb-4">
      Tool Usage
    </h3>

    <div className="h-[300px] flex items-center justify-center text-gray-400">
    <ToolUsageChart data={chartData} />    </div>

  </div>

  <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6">
    
    <h3 className="text-white text-lg font-semibold mb-4">
      AI Recommendations
    </h3>

    <div className="space-y-4">
      
      {analytics?.recommendations?.map((item, index) => (

  <div
    key={index}
    className="bg-white/5 rounded-xl p-4"
  >

    <p className="text-white text-sm">
      {item}
    </p>

  </div>

))}

    </div>

  </div>

</div>


{/* Workflow Table */}
<div className="bg-[#0F172A] border border-white/10 rounded-2xl p-6 mt-8">

  <div className="flex items-center justify-between mb-6">
    
    <h3 className="text-white text-lg font-semibold">
      Recent Workflows
    </h3>

    <button className="text-emerald-400 text-sm">
      View All
    </button>

  </div>

{usageData.length === 0 ? (

  <EmptyState
    title="No Workflow Data"
    description="No workflow executions found yet."
  />

) : (

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead>
        <tr className="text-left text-gray-400 border-b border-white/10">

          <th className="pb-4">Task</th>
          <th className="pb-4">Tools</th>
          <th className="pb-4">Cost</th>
          <th className="pb-4">Date</th>

        </tr>
      </thead>

      <tbody>

        {usageData.map((workflow, index) => (

          <tr
            key={index}
            className="border-b border-white/5 text-white"
          >

            <td className="py-4">
              {workflow.task}
            </td>

            <td className="py-4">
              {workflow.toolsUsed.join(", ")}
            </td>

            <td className="py-4">
              ${workflow.estimatedCost}
            </td>

            <td className="py-4">
              {new Date(
                workflow.createdAt
              ).toLocaleDateString()}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

)}

  

</div>

{/* Sustainability Insights */}

<div className="mt-8">

  <div className="flex items-center justify-between mb-6">

    <SectionTitle
      title="Sustainability Insights"
      subtitle="Track environmental impact of AI usage"
    />

    <AIBadge />

  </div>

  <div className="grid grid-cols-4 gap-6">

    <StatCard
      title="Carbon Emitted"
      value={`${carbonData?.totalCarbonGrams || 0}g`}
      subtitle="Total CO₂ generated"
    />

    <StatCard
      title="Water Consumed"
      value={`${carbonData?.totalWaterConsumedMl || 0}ml`}
      subtitle="Cooling water usage"
    />

    <StatCard
      title="Trees Needed"
      value={carbonData?.treesNeeded || 0}
      subtitle="To offset emissions"
    />

    <StatCard
      title="Impact Level"
      value={carbonData?.impactLevel || "Low"}
      subtitle="Environmental severity"
    />

  </div>

</div>

    </div>
  );
}