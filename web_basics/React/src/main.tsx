// @ts-ignore
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import App from "./Aufgabe 0 - Index-Seite/App.tsx";
import App1 from "./Aufgabe 1 - Components/App.tsx";
import App2 from "./Aufgabe 2 - Components-States/App.tsx";
import App3 from "./Aufgabe 3 - Demo-Projekt-Card-und-Daten/App.tsx";
import App4 from "./Aufgabe 4 - Lichtschalter/App.tsx";
import App5 from "./Aufgabe 5 - ToDo-Liste/App.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/Aufgabe1",
        element: <App1/>,
    },
    {
        path: "/Aufgabe2",
        element: <App2/>,
    },
    {
        path: "/Aufgabe3",
        element: <App3/>,
    },
    {
        path: "/Aufgabe4",
        element: <App4/>,
    },
    {
        path: "/Aufgabe5",
        element: <App5/>,
    },
]);

const root = document.getElementById("root");

// @ts-ignore
ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />,
);