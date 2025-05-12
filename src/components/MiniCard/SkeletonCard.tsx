export default function SkeletonCard({ variable }: { variable: string }) {
  return (
    <div
      className={`flex ${variable === "horizontal" ? "flex-col items-end md:flex-row md:items-center" : "flex-col"} gap-2 rounded-lg bg-white ${variable === "mini" ? "" : "p-4"} animate-pulse`}
    >
      <div
        className={`bg-gray-200 ${
          variable === "mini" ? "h-[172px] w-[172px]" : "h-[248px] w-[248px]"
        } rounded`}
      ></div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
        <div className="h-6 w-1/2 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
