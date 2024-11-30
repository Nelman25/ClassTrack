import Header from "./Header";
import ClassCard from "./ClassCard";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <main className="max-w-[1440px] font-montserrat mx-auto grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-10 mt-12">
        <ClassCard />
      </main>
    </div>
  );
};

export default Dashboard;
