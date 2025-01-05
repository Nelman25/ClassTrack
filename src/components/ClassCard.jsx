/* eslint-disable react/prop-types */
const ClassCard = ({ classItem, onSelect }) => {
  const { subject, section, classSize, schedule, id } = classItem;
  return (
    <div
      onClick={() => onSelect(id)}
      key={id}
      className="rounded-xl h-[300px] p-8 border border-slate-700 flex flex-col justify-center items-center text-center odd:text-slate-100 odd:bg-[#2E2EA1] even:bg-yellow-500 hover:bg-opacity-90 transition ease-in-out delay-100"
    >
      <h2 className="font-bold text-2xl">{subject}</h2>
      <p className="text-xl font-medium mt-2">{section}</p>
      <p className="text-lg mt-4">
        <strong>{classSize}</strong> students
      </p>
      <p className="text-base mt-2 w-[250px]">{schedule}</p>
    </div>
  );
};

export default ClassCard;
