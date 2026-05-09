import {
  DollarSign,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Leaf,
  Droplets,
  TreePine,
  Gauge,
} from "lucide-react";

import SectionTitle from "../components/shared/SectionTitle";
import StatCard from "../components/shared/StatCard";

import ToolUsageChart from "../components/charts/ToolUsageChart";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import {
  getExecutiveAnalytics,
  getUsageAnalytics,
  getCarbonAnalytics,
} from "../services/analyticsService";
import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import EmptyState from "../components/shared/EmptyState";
import GlassCard from "../components/ui/GlassCard";

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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // Build chart data
  const toolUsageMap = {};
  usageData.forEach((workflow) => {
    workflow.toolsUsed.forEach((tool) => {
      toolUsageMap[tool] = (toolUsageMap[tool] || 0) + 1;
    });
  });
  const chartData = Object.entries(toolUsageMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle
          title="Executive Overview"
          subtitle="Monitor AI usage, spend, and optimization insights"
        />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Health Score"
          value={`${analytics?.healthScore || 0}%`}
          subtitle="AI ecosystem efficiency"
          icon={<ShieldCheck size={18} />}
          glowColor="cyan"
          delay={0}
        />
        <StatCard
          title="Monthly Spend"
          value={`$${analytics?.totalAISpend || 0}`}
          subtitle="Across all AI tools"
          icon={<DollarSign size={18} />}
          glowColor="violet"
          delay={0.05}
        />
        <StatCard
          title="Estimated Savings"
          value={`$${analytics?.estimatedSavings || 0}`}
          subtitle="Optimization opportunities"
          icon={<TrendingUp size={18} />}
          glowColor="emerald"
          delay={0.1}
        />
        <StatCard
          title="Risk Alerts"
          value={analytics?.risks?.length || 0}
          subtitle="Potential issues detected"
          icon={<AlertTriangle size={18} />}
          glowColor="amber"
          delay={0.15}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard delay={0.2} glowColor="cyan">
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#e2e8f0",
              marginBottom: 16,
            }}
          >
            Tool Usage Distribution
          </h3>
          <ToolUsageChart data={chartData} />
        </GlassCard>

        <GlassCard delay={0.25} glowColor="violet">
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#e2e8f0",
              marginBottom: 16,
            }}
          >
            AI Recommendations
          </h3>
          <div className="flex flex-col gap-3">
            {analytics?.recommendations?.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: 12,
                  padding: "12px 16px",
                }}
              >
                <p style={{ color: "#cbd5e1", fontSize: "0.82rem", lineHeight: 1.5 }}>
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Workflow Table */}
      <GlassCard delay={0.3}>
        <div className="flex items-center justify-between mb-6">
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#e2e8f0",
            }}
          >
            Recent Workflows
          </h3>
          <button
            style={{
              fontSize: "0.78rem",
              color: "#06b6d4",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
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
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Tools</th>
                  <th>Cost</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {usageData.map((workflow, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 + index * 0.03 }}
                  >
                    <td>{workflow.task}</td>
                    <td>
                      <div className="flex flex-wrap gap-1.5">
                        {workflow.toolsUsed.map((t, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "0.7rem",
                              background: "rgba(6,182,212,0.08)",
                              border: "1px solid rgba(6,182,212,0.12)",
                              color: "#06b6d4",
                              padding: "2px 8px",
                              borderRadius: 6,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ color: "#10b981", fontWeight: 500 }}>
                      ${workflow.estimatedCost}
                    </td>
                    <td>
                      {new Date(workflow.createdAt).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {/* Sustainability Insights */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <SectionTitle
            title="Sustainability Insights"
            subtitle="Track environmental impact of AI usage"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Carbon Emitted"
            value={`${carbonData?.totalCarbonGrams || 0}g`}
            subtitle="Total CO₂ generated"
            icon={<Leaf size={18} />}
            glowColor="emerald"
            delay={0.4}
          />
          <StatCard
            title="Water Consumed"
            value={`${carbonData?.totalWaterConsumedMl || 0}ml`}
            subtitle="Cooling water usage"
            icon={<Droplets size={18} />}
            glowColor="cyan"
            delay={0.45}
          />
          <StatCard
            title="Trees Needed"
            value={carbonData?.treesNeeded || 0}
            subtitle="To offset emissions"
            icon={<TreePine size={18} />}
            glowColor="emerald"
            delay={0.5}
          />
          <StatCard
            title="Impact Level"
            value={carbonData?.impactLevel || "Low"}
            subtitle="Environmental severity"
            icon={<Gauge size={18} />}
            glowColor="amber"
            delay={0.55}
          />
        </div>
      </div>
    </div>
  );
}