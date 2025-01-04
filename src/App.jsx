import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Masterlist from "./components/Masterlist";
import GradingSheet from "./components/GradingSheet";
import Dashboard from "./components/Dashboard";
import AttendanceSheet from "./components/AttendanceSheet";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/masterlist/:classId", element: <Masterlist /> },
      { path: "/gradingsheet/:classId", element: <GradingSheet /> },
      { path: "/attendancesheet/:classId", element: <AttendanceSheet /> },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  { path: "/login", element: <Signin /> },
  { path: "/signup", element: <Signup /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
