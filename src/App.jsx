import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import RootLayout from "./components/RootLayout";
import MasterList from "./components/Masterlist";
import GradingSheet from "./components/GradingSheet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/masterlist", element: <MasterList /> },
      { path: "/gradingsheet", element: <GradingSheet /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
