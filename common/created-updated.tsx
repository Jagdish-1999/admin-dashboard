import { ProductsItemTypes } from "@/types/products.slice.types";

interface CreatedUpdatedAtProps<T> {
  item: T;
  accessKey: keyof T;
}

const CreatedUpdatedAt = <T,>({
  item,
  accessKey,
}: CreatedUpdatedAtProps<T>) => {
  const [date, time] = (item[accessKey] as string).split(" ");

  return (
    // ? py-2 gives height to every row excepting table header
    <div className="w-fit leading-4 py-2 m-auto">
      <h4 className="text-[10px] opacity-80 w-fit">{time}</h4>
      <h4 className="text-[11px] ">{date}</h4>
    </div>
  );
};

export { CreatedUpdatedAt };
