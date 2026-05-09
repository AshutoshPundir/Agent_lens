export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative" style={{ width: 48, height: 48 }}>
        <div className="absolute inset-0" style={{ border: "2px solid rgba(0,234,255,0.08)", borderRadius: "50%" }} />
        <div className="absolute inset-0 animate-spin" style={{ border: "2px solid transparent", borderTopColor: "#00eaff", borderRadius: "50%", animation: "spin 1s linear infinite", filter: "drop-shadow(0 0 4px rgba(0,234,255,0.4))" }} />
        <div className="absolute" style={{ inset: 6, border: "1.5px solid transparent", borderTopColor: "#a855f7", borderRadius: "50%", animation: "spin 1.5s linear infinite reverse" }} />
      </div>
    </div>
  );
}