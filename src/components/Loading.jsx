import { VscLoading } from "react-icons/vsc";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <VscLoading className="animate-spin text-[10rem] text-slate-200" />
    </div>
  );
};

export default Loading;
