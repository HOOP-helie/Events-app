import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage"
import RootLayout from "./layout/RootLayout"
import EventPage, { eventsLoader } from "./pages/EventPage"
import EventDetailPage, { eventDetailLoader, action as deleteEventAction } from "./pages/EventDetailPage"
import NewEventPage from "./pages/NewEventPage"
import EditEventPage from "./pages/EditEventPage"
import ErrorPage from "./pages/ErrorPage"
import EventsLayout from "./layout/EventsLayout";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from './pages/NewsletterPage';

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
            action: manipulateEventAction
          },
          {
            path: ":id",
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                action: manipulateEventAction,
                element: <EditEventPage />,
              },
            ]
          },
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },

    ]
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
