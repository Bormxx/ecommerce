export default function SkeletonCard({ variable }: { variable: string }) {
  return (
    <div
      className={`rounded-lg bg-white p-4 ${
        variable === "horizontal"
          ? "flex flex-col gap-4 md:flex-row"
          : "flex flex-col gap-2"
      } animate-pulse`}
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
