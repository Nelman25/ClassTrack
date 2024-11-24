import Header from "./components/Header";
import Masterlist from "./components/Masterlist";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <>
      <Header />
      <main className="flex max-w-[1920px] gap-6 mx-auto">
        <Sidebar />
        <Masterlist />
      </main>
    </>
  );
};

export default App;
