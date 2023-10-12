import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage"
import RootLayout from "./layout/RootLayout"
import EventPage, { eventsLoader } from "./pages/EventPage"
import EventDetailPage, { eventLoader } from "./pages/EventDetailPage"
import NewEventPage from "./pages/NewEventPage"
import EditEventPage from "./pages/EditEventPage"
import ErrorPage from "./pages/ErrorPage"
import EventsLayout from "./layout/EventsLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
            errorElement: <ErrorPage />,
            loader: eventsLoader
          },
          {
            path: "new",
            element: <NewEventPage />,
          },
          {
            path: ":id",
            loader: eventLoader,
            id: 'event-detail',
            children: [
              {
                index: true,
                element: <EventDetailPage />,
              },
              {
                path: "edit",
                element: <EditEventPage />,
              },
            ]
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
