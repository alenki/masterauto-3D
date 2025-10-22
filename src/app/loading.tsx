// app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-70" />
      <p className="ml-3 text-gray-600">MASTER AUTO</p>
    </div>
  );
}
