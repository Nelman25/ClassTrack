import Loading from "./Loading";
import { useEffect } from "react";
import { fetchSectionsInfo } from "../../reducers/sectionSlice";
import { useDispatch, useSelector } from "react-redux";

const SubjectCard = () => {
  const sections = useSelector((state) => state.sections.sectionInfo);
  const loading = useSelector((state) => state.sections.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSectionsInfo());
  }, [dispatch]);

  sections.map((section) => {
    console.log(section.members);
    console.log(section.subject);
    console.log(section.section);
  });

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        sections.map((section) => {
          return (
            <div
              key={section.id}
              className="rounded-xl h-[400px] border border-slate-700 flex flex-col justify-center items-center text-center odd:text-slate-200 odd:bg-[#2E2EA1] even:bg-yellow-500"
            >
              <h2 className="font-semibold text-4xl">{section.subject}</h2>
              <p className="text-3xl font-medium">{section.section}</p>
              <p className="text-2xl">{section.members} members</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SubjectCard;
