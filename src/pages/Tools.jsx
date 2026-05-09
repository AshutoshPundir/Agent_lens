import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import SectionTitle from "../components/shared/SectionTitle";

import LoadingSpinner from "../components/shared/LoadingSpinner";
import ErrorMessage from "../components/shared/ErrorMessage";
import ToolCard from "../components/tools/ToolCard";
import ToolComparisonModal from "../components/tools/ToolComparisonModal";
import GlowButton from "../components/ui/GlowButton";

import {
  getAllTools,
  getToolsByCategory,
  compareTools,
} from "../services/toolService";

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTools, setSelectedTools] = useState([]);
  const [comparisonData, setComparisonData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCompare = async () => {
    if (selectedTools.length !== 2) return;
    try {
      const response = await compareTools({
        tool1: selectedTools[0],
        tool2: selectedTools[1],
      });
      setComparisonData(response.data);
      setModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const categories = [
    "all", "chat", "coding", "security", "devops",
    "data", "cloud", "video", "image", "agent",
  ];

  useEffect(() => {
    fetchTools();
  }, [selectedCategory]);

  const fetchTools = async () => {
    setLoading(true);
    try {
      let response;
      if (selectedCategory === "all") {
        response = await getAllTools();
      } else {
        response = await getToolsByCategory(selectedCategory);
      }
      setTools(response.data);
    } catch (err) {
      setError("Failed to fetch tools");
    } finally {
      setLoading(false);
    }
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionTitle
          title="AI Tools Catalog"
          subtitle="Browse and compare AI tools"
        />
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-3 transition-all duration-300"
        style={{
          background: "rgba(15, 23, 42, 0.5)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "12px 18px",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(6,182,212,0.08), 0 0 20px rgba(6,182,212,0.05)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <Search size={17} style={{ color: "#475569", flexShrink: 0 }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search AI tools..."
          style={{
            background: "transparent",
            outline: "none",
            border: "none",
            fontSize: "0.85rem",
            color: "#e2e8f0",
            width: "100%",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: "7px 16px",
              borderRadius: 10,
              fontSize: "0.78rem",
              fontWeight: 500,
              cursor: "pointer",
              border: "1px solid",
              textTransform: "capitalize",
              fontFamily: "'Inter', sans-serif",
              transition: "all 200ms",
              ...(selectedCategory === category
                ? {
                    background: "rgba(6,182,212,0.12)",
                    borderColor: "rgba(6,182,212,0.25)",
                    color: "#06b6d4",
                  }
                : {
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "#64748b",
                  }),
            }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Compare Action */}
      <div className="flex justify-end">
        <GlowButton
          onClick={handleCompare}
          disabled={selectedTools.length !== 2}
          variant={selectedTools.length === 2 ? "primary" : "ghost"}
          size="sm"
        >
          Compare Tools {selectedTools.length > 0 && `(${selectedTools.length}/2)`}
        </GlowButton>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map((tool, index) => (
          <motion.div
            key={tool._id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ToolCard tool={tool} />

            {/* Compare toggle */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                if (selectedTools.includes(tool.name)) {
                  setSelectedTools(
                    selectedTools.filter((item) => item !== tool.name)
                  );
                } else if (selectedTools.length < 2) {
                  setSelectedTools([...selectedTools, tool.name]);
                }
              }}
              style={{
                marginTop: 8,
                width: "100%",
                padding: "9px 0",
                borderRadius: 12,
                fontSize: "0.78rem",
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
                      color: "#64748b",
                    }),
              }}
            >
              {selectedTools.includes(tool.name) ? "✓ Selected" : "Compare"}
            </motion.button>
          </motion.div>
        ))}
      </div>

      <ToolComparisonModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        comparison={comparisonData}
      />
    </div>
  );
}