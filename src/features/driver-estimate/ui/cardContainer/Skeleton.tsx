const Skeleton = () => {
  return (
    <div className="w-full max-w-[558px] animate-pulse rounded-2xl bg-gray-100 p-6">
      <div className="mb-4 flex justify-between">
        <div className="h-5 w-24 rounded bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200" />
      </div>

      <div className="mb-4 h-6 w-40 rounded bg-gray-200" />

      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />
      </div>

      <div className="mt-6 flex gap-3">
        <div className="h-10 w-full rounded bg-gray-200" />
        <div className="h-10 w-full rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default Skeleton;
