export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-1" />
          <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
        </div>
      </header>
      <div className="max-w-lg mx-auto px-4 py-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
        <div className="h-64 bg-gray-200 rounded-2xl animate-pulse mt-6" />
      </div>
    </main>
  );
}
