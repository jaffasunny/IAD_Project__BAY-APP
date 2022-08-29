import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage/SignupPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import TermsPage from "./pages/TermsPage/TermsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import { UserContext, UserProvider } from "./context/UserProvider";
import { useContext, useEffect } from "react";

const container = document.getElementById("root");

const root = createRoot(container);

const RootComponent = () => {
  const token = useContext(UserContext);
  // useEffect(() => {}, [token]);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path='/signup'
            element={!token ? <SignupPage /> : <Navigate replace to='/' />}
          />
          <Route
            path='/login'
            element={!token ? <LoginPage /> : <Navigate replace to='/' />}
          />
          <Route
            path='/'
            element={!token ? <Navigate replace to='/login' /> : <App />}
          />
          <Route
            path='/reportPage'
            element={!token ? <Navigate replace to='/login' /> : <ReportPage />}
          />
          <Route
            path='/termsandconditions'
            element={!token ? <Navigate replace to='/login' /> : <TermsPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

root.render(
  <UserProvider>
    <RootComponent />
  </UserProvider>
);

serviceWorkerRegistration.register();

reportWebVitals();
