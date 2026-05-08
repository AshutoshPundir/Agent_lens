export default function EmptyState({
  title,
  description,
}) {
  return (
    <div className="border border-dashed border-white/10 rounded-2xl p-10 text-center bg-[#0F172A]">
      
      <h2 className="text-xl font-semibold text-white mb-2">
        {title}
      </h2>

      <p className="text-gray-400">
        {description}
      </p>

    </div>
  );
}