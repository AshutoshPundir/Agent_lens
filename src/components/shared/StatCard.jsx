export default function StatCard({
  title,
  value,
  icon,
  subtitle,
}) {
  return (
    <div className="bg-[#0F172A] border border-white/10 rounded-2xl p-5 hover:border-emerald-500/30 transition">
      
      <div className="flex items-center justify-between mb-4">
        
        <h3 className="text-gray-400 text-sm">
          {title}
        </h3>

        <div className="text-emerald-400">
          {icon}
        </div>

      </div>

      <h2 className="text-3xl font-bold text-white">
        {value}
      </h2>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}