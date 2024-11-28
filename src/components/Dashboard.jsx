import Header from "./Header";
import SubjectCard from "./SubjectCard";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="max-w-[1440px] font-montserrat mx-auto grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5 mt-12">
        <SubjectCard />
      </div>
    </div>
  );
};

export default Dashboard;
