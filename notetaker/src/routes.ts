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
    loader({params}){
      return fetch('/api/notes/' + params.noteId).then(res => res.json());
    }
  }
];

export const router = createBrowserRouter(routes);