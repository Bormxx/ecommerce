import { AcademicCapIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="flex">
      <div className="m-auto mt-10 flex">
        <AcademicCapIcon className="size-10 mr-5" />
        <h1 className="text-center text-3xl font-bold">Стартовая страница.</h1>
        <AcademicCapIcon className="size-10 ml-5" />
      </div>
    </div>
  );
}
