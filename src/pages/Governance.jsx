import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

import SectionTitle from "../components/shared/SectionTitle";

import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";

import {
  validateWorkflow,
  simulatePolicy,
} from "../services/governanceService";

export default function Governance() {
  // Validation States
  const [task, setTask] = useState("");
  const [budget, setBudget] = useState("medium");
  const [priority, setPriority] = useState("quality");
  const [restrictedTool, setRestrictedTool] = useState("ChatGPT Plus");
  const [maxBudget, setMaxBudget] = useState(100);
  const [validationResult, setValidationResult] = useState(null);

  // Simulation States
  const [simulationResult, setSimulationResult] = useState(null);
  const [simulationTool, setSimulationTool] = useState("ChatGPT Plus");

  // Common States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Validate Workflow
  const handleValidation = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        task,
        budget,
        priority,
        organizationPolicy: {
          restrictedTools: [restrictedTool],
          maxMonthlyBudget: Number(maxBudget),
        },
      };
      const response = await validateWorkflow(payload);
      setValidationResult(response.data);
    } catch (err) {
      setError("Validation failed");
    } finally {
      setLoading(false);
    }
  };

  // Simulate Policy
  const handleSimulation = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        currentSubscriptions: ["Claude Pro"],
        scenario: { action: "add", tool: simulationTool },
      };
      const response = await simulatePolicy(payload);
      setSimulationResult(response.data);
    } catch (err) {
      setError("Simulation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle
          title="Governance & Policy Simulator"
          subtitle="Validate workflows and simulate AI policy impact"
        />
      </div>

      {/* Validation Form */}
      <GlassCard delay={0.1} glowColor="emerald">
        <form onSubmit={handleValidation} className="flex flex-col gap-6">
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.15rem",
              fontWeight: 600,
              color: "#e2e8f0",
            }}
          >
            Workflow Validation
          </h2>

          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Describe workflow..."
            className="premium-textarea"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="premium-select"
            >
              <option value="low">Low Budget</option>
              <option value="medium">Medium Budget</option>
              <option value="high">High Budget</option>
            </select>

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

          <input
            type="text"
            value={restrictedTool}
            onChange={(e) => setRestrictedTool(e.target.value)}
            placeholder="Restricted Tool"
            className="premium-input"
          />

          <input
            type="number"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            placeholder="Max Budget"
            className="premium-input"
          />

          <div>
            <GlowButton type="submit" variant="success">
              Validate Workflow
            </GlowButton>
          </div>
        </form>
      </GlassCard>

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Error */}
      {error && <ErrorMessage message={error} />}

      {/* Validation Result */}
      {validationResult && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlassCard delay={0} glowColor={validationResult.isCompliant ? "emerald" : "rose"}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.15rem",
                fontWeight: 600,
                color: "#e2e8f0",
                marginBottom: 16,
              }}
            >
              Compliance Result
            </h2>

            <div
              className="flex items-center gap-3"
              style={{
                padding: "14px 18px",
                borderRadius: 14,
                background: validationResult.isCompliant
                  ? "rgba(16,185,129,0.08)"
                  : "rgba(244,63,94,0.08)",
                border: `1px solid ${
                  validationResult.isCompliant
                    ? "rgba(16,185,129,0.15)"
                    : "rgba(244,63,94,0.15)"
                }`,
              }}
            >
              {validationResult.isCompliant ? (
                <CheckCircle2 size={20} style={{ color: "#10b981" }} />
              ) : (
                <XCircle size={20} style={{ color: "#f43f5e" }} />
              )}
              <span
                style={{
                  color: validationResult.isCompliant ? "#10b981" : "#f43f5e",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              >
                {validationResult.isCompliant
                  ? "Workflow Approved"
                  : "Policy Violations Detected"}
              </span>
            </div>

            {/* Violations */}
            {validationResult.violations?.length > 0 && (
              <div style={{ marginTop: 20 }}>
                <h3
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#e2e8f0",
                    marginBottom: 12,
                  }}
                >
                  Violations
                </h3>
                <div className="flex flex-col gap-3">
                  {validationResult.violations.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      style={{
                        background: "rgba(244,63,94,0.06)",
                        border: "1px solid rgba(244,63,94,0.1)",
                        borderRadius: 12,
                        padding: "12px 16px",
                        color: "#fb7185",
                        fontSize: "0.82rem",
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      )}

      {/* Policy Simulation */}
      <GlassCard delay={0.15} glowColor="cyan">
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "#e2e8f0",
            marginBottom: 20,
          }}
        >
          Policy Simulation
        </h2>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={simulationTool}
            onChange={(e) => setSimulationTool(e.target.value)}
            placeholder="Tool Name"
            className="premium-input"
            style={{ flex: 1 }}
          />
          <GlowButton onClick={handleSimulation} variant="primary">
            Simulate
          </GlowButton>
        </div>

        {/* Simulation Result */}
        {simulationResult && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-5"
          >
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#e2e8f0",
                marginBottom: 16,
              }}
            >
              Impact Analysis
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { label: "Previous Spend", value: `$${simulationResult.previousSpend}` },
                { label: "New Spend", value: `$${simulationResult.newSpend}` },
                { label: "Spend Difference", value: `$${simulationResult.spendDifference}` },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between"
                  style={{
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <span style={{ fontSize: "0.82rem", color: "#64748b" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: "0.88rem", color: "#e2e8f0", fontWeight: 500 }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                color: "#10b981",
                fontSize: "0.85rem",
                marginTop: 16,
                fontWeight: 500,
              }}
            >
              {simulationResult.impactSummary}
            </p>
          </motion.div>
        )}
      </GlassCard>
    </div>
  );
}