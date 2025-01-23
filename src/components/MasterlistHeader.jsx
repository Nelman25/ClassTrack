import { studentFields } from "@/lib/constants";

const MasterlistHeader = () => {
  return (
    <header className="w-full bg-[#34418E] sticky top-0">
      <ul className="grid grid-cols-[2fr_3fr_1fr_1fr_4fr] gap-6 py-2 items-center px-4 text-white text-base font-montserrat font-semibold">
        {studentFields.map((field) => (
          <li key={field} className="min-w-[150px] py-2">
            {field}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default MasterlistHeader;
