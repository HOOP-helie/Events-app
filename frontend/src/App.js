import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage"
import RootLayout from "./layout/RootLayout"
import EventPage from "./pages/EventPage"
import EventDetailPage from "./pages/EventDetailPage"
import NewEventPage from "./pages/NewEventPage"
import EditEventPage from "./pages/EditEventPage"
import EventsLayout from "./layout/EventsLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventPage />,
          },
          {
            path: "new",
            element: <NewEventPage />,
          },
          {
            path: ":id",
            element: <EventDetailPage />,
          },
          {
            path: ":id/edit",
            element: <EditEventPage />,
          },
        ]
      },

    ]
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
