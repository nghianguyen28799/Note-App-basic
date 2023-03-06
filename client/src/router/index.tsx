import { Outlet, createBrowserRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import AuthProvider from "@/context/AuthProvider";
import Login from "@/pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "@/pages/Home";
import NoteList from "@/components/NoteList";
import Note from "@/components/Note";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            children: [
              {
                element: <NoteList />,
                path: `folders/:folderId`,

                // action: addNewNote,
                // loader: notesLoader,
                children: [
                  {
                    element: <Note />,
                    path: `note/:noteId`,
                    // action: updateNote,
                    // loader: noteLoader,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
