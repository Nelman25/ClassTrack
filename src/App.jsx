import GradingSheet from "./components/GradingSheet";
import Header from "./components/Header";
import Masterlist from "./components/Masterlist";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <Header />
      <main className="flex max-w-[1920px] gap-6 mx-auto">
        <Sidebar />
        {/* <Masterlist /> */}
        <GradingSheet />
      </main>
    </>
  );
};

export default App;
