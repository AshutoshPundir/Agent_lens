import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, AlertTriangle, DollarSign, CheckCircle2 } from "lucide-react";
import SectionTitle from "../components/shared/SectionTitle";

import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import StatCard from "../components/shared/StatCard";
import GlassCard from "../components/ui/GlassCard";
import { getOptimizationInsights } from "../services/analyticsService";

export default function Optimization() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await getOptimizationInsights();
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch optimization insights");
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const Section = ({ title, items, icon, color, bgColor, borderColor }) => (
    <GlassCard delay={0} glowColor={color}>
      <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}
            className="flex items-center gap-3"
            style={{ background: bgColor, border: `1px solid ${borderColor}`, borderRadius: 12, padding: "12px 16px" }}>
            {icon}
            <p style={{ color: color === "rose" ? "#fb7185" : color === "emerald" ? "#34d399" : "#67e8f9", fontSize: "0.82rem", lineHeight: 1.5 }}>{item}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <SectionTitle title="Optimization Insights" subtitle="AI-generated insights for improving AI usage efficiency" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StatCard title="Estimated Spend" value={`$${data.totalEstimatedSpend}`} subtitle="Current AI ecosystem spend" icon={<DollarSign size={18} />} glowColor="violet" />
        <StatCard title="Optimization Signals" value={data.recommendedActions.length} subtitle="AI-generated improvement opportunities" icon={<BrainCircuit size={18} />} glowColor="cyan" />
      </div>

      <Section title="AI Insights" items={data.insights} icon={null} color="cyan" bgColor="rgba(6,182,212,0.06)" borderColor="rgba(6,182,212,0.1)" />
      <Section title="Redundancies" items={data.redundancies} icon={<AlertTriangle size={16} style={{ color: "#fb7185", flexShrink: 0 }} />} color="rose" bgColor="rgba(244,63,94,0.06)" borderColor="rgba(244,63,94,0.1)" />
      <Section title="Cost Saving Opportunities" items={data.costSavingOpportunities} icon={<DollarSign size={16} style={{ color: "#34d399", flexShrink: 0 }} />} color="emerald" bgColor="rgba(16,185,129,0.06)" borderColor="rgba(16,185,129,0.1)" />

      <GlassCard delay={0} glowColor="emerald">
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>Recommended Actions</h2>
        <div className="flex flex-col gap-3">
          {data.recommendedActions.map((action, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-center gap-3 glass-card p-4">
              <CheckCircle2 size={16} style={{ color: "#10b981", flexShrink: 0 }} />
              <p style={{ color: "#cbd5e1", fontSize: "0.82rem", lineHeight: 1.5 }}>{action}</p>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}