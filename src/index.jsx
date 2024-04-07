import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store.js";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import Navbar from "./scenes/Navbar/Navbar.jsx";
import LoginPage from "./scenes/LoginPage/LoginPage.jsx";
import SignUpPage from "./scenes/LoginPage/SignUpPage.jsx";
import HomePage from "./scenes/HomePage/HomePage.jsx";
import ProfilePage from "./scenes/ProfilePage/ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotFound from "./NotFound.jsx";

// ROUTER SETUP
const router = createBrowserRouter([
  {
    element: <Navbar />,
    errorElement: <NotFound />,
    children: [
      // login page
      {
        path: "/login",
        element: <LoginPage />,
      },
      // signup page
      {
        path: "/",
        element: <SignUpPage />,
      },
      // home page
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      // profile page (Dynamic)
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
