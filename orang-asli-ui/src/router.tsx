import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
// import WordList from "./WordList";
import Chatbot from "./Chatbot";
// import NotFound from "./NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/word-list", element: <WordList /> },
      { path: "/chat-with-grandma", element: <Chatbot /> },
      // { path: "*", element: <NotFound /> },
    ],
  },
]);
