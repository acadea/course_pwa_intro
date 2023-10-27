import { RouteObject, createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import NotesList from "./pages/notes/NotesList";
import React from "react";
import SingleNote from "./pages/notes/SingleNote";


const routes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Index)
  },
  // list of notes
  {
    path: '/notes',
    element: React.createElement(NotesList)
  },

  // single note
  {
    path: '/notes/:noteId',
    element: React.createElement(SingleNote),
  }
];

export const router = createBrowserRouter(routes);