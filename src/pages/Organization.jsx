import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import SectionTitle from "../components/shared/SectionTitle";

import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";
import { createOrganization } from "../services/organizationService";
import { getAllTools } from "../services/toolService";

export default function Organization() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [organizationSize, setOrganizationSize] = useState("startup");
  const [subscriptions, setSubscriptions] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamBudget, setTeamBudget] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const payload = {
        name, industry, organizationSize, subscriptions,
        teams: [{ name: teamName, monthlyBudget: Number(teamBudget), aiTools: subscriptions }],
      };
      await createOrganization(payload);
      setSuccess("Organization created successfully");
    } catch (err) {
      setError("Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <SectionTitle title="Organization Setup" subtitle="Configure enterprise AI environment" />
      </div>

      <GlassCard delay={0.1} glowColor="violet">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Organization Details */}
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>Organization Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Organization Name" className="premium-input" />
              <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Industry" className="premium-input" />
            </div>
            <select value={organizationSize} onChange={(e) => setOrganizationSize(e.target.value)} className="premium-select">
              <option value="startup">Startup</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>

          {/* AI Subscriptions */}
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>AI Subscriptions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {tools.map((tool) => (
                <motion.button type="button" key={tool._id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (subscriptions.includes(tool.name)) {
                      setSubscriptions(subscriptions.filter((item) => item !== tool.name));
                    } else {
                      setSubscriptions([...subscriptions, tool.name]);
                    }
                  }}
                  style={{
                    padding: "12px 16px", borderRadius: 14, fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", border: "1px solid",
                    fontFamily: "'Inter', sans-serif", transition: "all 200ms",
                    ...(subscriptions.includes(tool.name)
                      ? { background: "rgba(6,182,212,0.12)", borderColor: "rgba(6,182,212,0.25)", color: "#06b6d4" }
                      : { background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", color: "#94a3b8" }),
                  }}
                >
                  {subscriptions.includes(tool.name) ? "✓ " : ""}{tool.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Team Setup */}
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: 16 }}>Team Setup</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team Name" className="premium-input" />
              <input type="number" value={teamBudget} onChange={(e) => setTeamBudget(e.target.value)} placeholder="Monthly Budget" className="premium-input" />
            </div>
          </div>

          <div><GlowButton type="submit" variant="success">Create Organization</GlowButton></div>
        </form>
      </GlassCard>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {success && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3"
          style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: 16, padding: "14px 18px", color: "#34d399", fontSize: "0.85rem" }}>
          <CheckCircle size={18} style={{ flexShrink: 0 }} />{success}
        </motion.div>
      )}
    </div>
  );
}