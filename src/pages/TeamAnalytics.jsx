import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, DollarSign, Workflow } from "lucide-react";
import SectionTitle from "../components/shared/SectionTitle";

import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import EmptyState from "../components/shared/EmptyState";
import StatCard from "../components/shared/StatCard";
import ToolUsageChart from "../components/charts/ToolUsageChart";
import GlassCard from "../components/ui/GlassCard";
import { getTeamAnalytics } from "../services/analyticsService";

export default function TeamAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await getTeamAnalytics("Engineering");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch team analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return <EmptyState title="No Team Data" description="No analytics found for this team." />;

  const chartData = Object.entries(data.toolUsage).map(([name, value]) => ({ name, value }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <SectionTitle title={`${data.teamName} Team Analytics`} subtitle="Monitor workflows, spend, and AI usage" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard title="Total Workflows" value={data.totalWorkflows} subtitle="Executed AI workflows" icon={<Workflow size={18} />} glowColor="cyan" />
        <StatCard title="Total Spend" value={`$${data.totalSpend}`} subtitle="AI infrastructure spend" icon={<DollarSign size={18} />} glowColor="violet" />
        <StatCard title="Unique Tools" value={Object.keys(data.toolUsage).length} subtitle="Tools actively used" icon={<Users size={18} />} glowColor="emerald" />
      </div>

      <GlassCard delay={0.1} glowColor="cyan">
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>Tool Usage Distribution</h2>
        <ToolUsageChart data={chartData} />
      </GlassCard>

      <GlassCard delay={0.15}>
        <div className="flex items-center justify-between mb-6">
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", fontWeight: 600, color: "#e2e8f0" }}>Workflow History</h2>
          <span style={{ fontSize: "0.75rem", color: "#475569" }}>{data.analytics.length} records</span>
        </div>

        {data.analytics.length === 0 ? (
          <EmptyState title="No Workflow History" description="No workflows executed yet." />
        ) : (
          <div className="overflow-x-auto">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Tools Used</th>
                  <th>Optimal Tool</th>
                  <th>Cost</th>
                  <th>Priority</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.analytics.map((workflow, index) => (
                  <motion.tr key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}>
                    <td>{workflow.task}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {workflow.toolsUsed.map((t, i) => (
                          <span key={i} style={{ fontSize: "0.68rem", background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.12)", color: "#06b6d4", padding: "2px 7px", borderRadius: 5 }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ color: "#10b981", fontWeight: 500 }}>{workflow.optimalTool}</td>
                    <td>${workflow.estimatedCost}</td>
                    <td style={{ textTransform: "capitalize" }}>{workflow.priority}</td>
                    <td>{new Date(workflow.createdAt).toLocaleDateString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
}