export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
      {message}
    </div>
  );
}