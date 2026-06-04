export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 rounded-xl" />
        ))}
      </div>
      <div className="h-96 bg-gray-100 rounded-xl" />
    </div>
  );
}
