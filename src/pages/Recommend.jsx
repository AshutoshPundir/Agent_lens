import { useState } from "react";
import { motion } from "framer-motion";

import SectionTitle from "../components/shared/SectionTitle";

import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";
import AnimatedCounter from "../components/ui/AnimatedCounter";

import { generateRecommendation } from "../services/recommendationService";
import WorkflowVisualizer from "../components/recommend/WorkflowVisualizer";
import OptimalToolCard from "../components/recommend/OptimalToolCard";

export default function Recommend() {
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("medium");
  const [priority, setPriority] = useState("quality");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { task, budget, priority };
      const response = await generateRecommendation(payload);
      setRecommendation(response.data);
    } catch (err) {
      setError("Failed to generate recommendation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle
          title="AI Recommendation Engine"
          subtitle="Generate optimized AI workflows"
        />
      </div>

      {/* Form */}
      <GlassCard delay={0.1} glowColor="violet">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Task */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 500,
                color: "#94a3b8",
                marginBottom: 8,
              }}
            >
              Task Description
            </label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe your task..."
              className="premium-textarea"
            />
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "#94a3b8",
                  marginBottom: 8,
                }}
              >
                Budget
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="premium-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  color: "#94a3b8",
                  marginBottom: 8,
                }}
              >
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="premium-select"
              >
                <option value="speed">Speed</option>
                <option value="quality">Quality</option>
                <option value="cost">Cost</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div>
            <GlowButton type="submit" variant="primary">
              Generate Recommendation
            </GlowButton>
          </div>
        </form>
      </GlassCard>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* Recommendation Result */}
      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.02em",
            }}
          >
            Recommended Workflow
          </h2>

          <OptimalToolCard tool={recommendation.allScores?.[0]} />

          {/* Workflow Steps */}
          <WorkflowVisualizer workflow={recommendation.orchestrationFlow} />

          {/* Cost */}
          <GlassCard delay={0} glowColor="emerald">
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 500,
                color: "#64748b",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Estimated Cost
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "2rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <AnimatedCounter
                value={recommendation.estimatedCostUSD}
                prefix="$"
                decimals={2}
              />
            </p>
          </GlassCard>

          {/* Reasoning */}
          <GlassCard delay={0} glowColor="violet">
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 500,
                color: "#64748b",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              AI Reasoning
            </p>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.88rem",
                lineHeight: 1.7,
              }}
            >
              {recommendation.reasoning}
            </p>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}