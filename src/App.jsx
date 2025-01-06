import "./App.css";
import AppLayout from "./Components/AppLayout";
import Calender from "./Components/Calender";
import Events from "./Components/Events";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Calender />,
        },
        {
          path: "/events",
          element: <Events />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
