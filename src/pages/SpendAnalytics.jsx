import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  DollarSign,
  AlertTriangle,
  Layers3,
} from "lucide-react";

import SectionTitle from "../components/shared/SectionTitle";
import StatCard from "../components/shared/StatCard";

import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";

import { getSpendAnalytics } from "../services/analyticsService";
import { getAllTools } from "../services/toolService";

export default function SpendAnalytics() {
  const [tools, setTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await getAllTools();
        setTools(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTools();
  }, []);

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getSpendAnalytics({ subscriptions: selectedTools });
      setAnalytics(response.data);
    } catch (err) {
      setError("Failed to analyze subscriptions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle
          title="Spend Analytics"
          subtitle="Analyze AI subscription costs and overlaps"
        />
      </div>

      {/* Subscription Selector */}
      <GlassCard delay={0.1} glowColor="violet">
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "#e2e8f0",
            marginBottom: 20,
          }}
        >
          Select Subscriptions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {tools.map((tool) => (
            <motion.button
              key={tool._id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (selectedTools.includes(tool.name)) {
                  setSelectedTools(
                    selectedTools.filter((item) => item !== tool.name)
                  );
                } else {
                  setSelectedTools([...selectedTools, tool.name]);
                }
              }}
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                fontSize: "0.82rem",
                fontWeight: 500,
                cursor: "pointer",
                border: "1px solid",
                fontFamily: "'Inter', sans-serif",
                transition: "all 200ms",
                ...(selectedTools.includes(tool.name)
                  ? {
                      background: "rgba(6,182,212,0.12)",
                      borderColor: "rgba(6,182,212,0.25)",
                      color: "#06b6d4",
                    }
                  : {
                      background: "rgba(255,255,255,0.02)",
                      borderColor: "rgba(255,255,255,0.06)",
                      color: "#94a3b8",
                    }),
              }}
            >
              {tool.name}
            </motion.button>
          ))}
        </div>

        <GlowButton onClick={handleAnalyze} variant="primary">
          Analyze Spend
        </GlowButton>
      </GlassCard>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* Analytics Result */}
      {analytics && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <StatCard
              title="Monthly Spend"
              value={`$${analytics.monthlySpend}`}
              subtitle="Total AI subscription cost"
              icon={<DollarSign size={18} />}
              glowColor="violet"
            />
            <StatCard
              title="Estimated Waste"
              value={`$${analytics.estimatedWaste}`}
              subtitle="Potential savings detected"
              icon={<AlertTriangle size={18} />}
              glowColor="amber"
            />
            <StatCard
              title="Overlap Detected"
              value={analytics.overlapDetected ? "Yes" : "No"}
              subtitle="Capability duplication"
              icon={<Layers3 size={18} />}
              glowColor={analytics.overlapDetected ? "rose" : "emerald"}
            />
          </div>

          {/* Overlapping Tools */}
          <GlassCard delay={0} glowColor="amber">
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "#e2e8f0",
                marginBottom: 16,
              }}
            >
              Overlapping Tools
            </h2>
            <div className="flex flex-col gap-3">
              {analytics.overlappingTools.map((overlap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-4"
                >
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: "#e2e8f0",
                    }}
                  >
                    {overlap.tools.join(" vs ")}
                  </h3>
                  <p style={{ color: "#f59e0b", fontSize: "0.8rem", marginTop: 6 }}>
                    Similarity: {overlap.similarity}
                  </p>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Suggestions */}
          <GlassCard delay={0} glowColor="emerald">
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: "#e2e8f0",
                marginBottom: 16,
              }}
            >
              Optimization Suggestions
            </h2>
            <div className="flex flex-col gap-3">
              {analytics.optimizationSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    background: "rgba(16,185,129,0.06)",
                    border: "1px solid rgba(16,185,129,0.1)",
                    borderRadius: 12,
                    padding: "12px 16px",
                    color: "#34d399",
                    fontSize: "0.82rem",
                    lineHeight: 1.5,
                  }}
                >
                  {suggestion}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}