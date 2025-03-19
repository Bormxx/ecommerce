import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  searchText: z.string(),
});

type Form = z.infer<typeof formSchema>;

export function ECSearchForm() {
  const { register, handleSubmit } = useForm<Form>();

  const onSubmit = (data: Form) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-grow">
      <input
        type="text"
        placeholder="Найдите товар..."
        className="flex-grow rounded-bl-[8px] rounded-tl-[8px] border-2 border-[#1E40AF] bg-white p-2"
        {...register("searchText")}
      />
      <button
        type="submit"
        className="flex h-full w-[65px] items-center justify-center rounded-br-[8px] rounded-tr-[8px] border-2 border-[#1E40AF] bg-[#1E40AF]"
      >
        <Image
          src={"/images/icons-search.svg"}
          width={24}
          height={24}
          alt="Search"
        />
      </button>
    </form>
  );
}
