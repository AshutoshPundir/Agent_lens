import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#06b6d4",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#f43f5e",
  "#3b82f6",
  "#ec4899",
  "#14b8a6",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "rgba(15, 23, 42, 0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12,
          padding: "10px 14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#e2e8f0",
            margin: 0,
          }}
        >
          {payload[0].name}
        </p>
        <p
          style={{
            fontSize: "0.75rem",
            color: payload[0].payload.fill || "#06b6d4",
            marginTop: 2,
          }}
        >
          {payload[0].value} usage{payload[0].value !== 1 ? "s" : ""}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div
      className="flex flex-wrap gap-3 justify-center"
      style={{ marginTop: 16 }}
    >
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: entry.color,
              boxShadow: `0 0 6px ${entry.color}40`,
            }}
          />
          <span style={{ fontSize: "0.72rem", color: "#94a3b8" }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function ToolUsageChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height: 300, color: "#334155", fontSize: "0.85rem" }}
      >
        No data available
      </div>
    );
  }

  return (
    <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={95}
            innerRadius={50}
            paddingAngle={3}
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                style={{
                  filter: `drop-shadow(0 0 4px ${COLORS[index % COLORS.length]}40)`,
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}