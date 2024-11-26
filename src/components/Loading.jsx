import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <VscLoading className="animate-spin text-[5rem] text-slate-300" />
    </div>
  );
};

export default Loading;
