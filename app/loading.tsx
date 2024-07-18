import { ImSpinner8 } from "react-icons/im";

const Loading = () => {
  return (
    <div className="flex flex-col gap-3 w-full h-full items-center justify-center bg-transparent ">
      <ImSpinner8 className="w-6 h-6 text-slate-600 animate-spin duration-1000 transition-all ease-in" />
      <div className="text-slate-500">Loading</div>
    </div>
  );
};

export default Loading;
