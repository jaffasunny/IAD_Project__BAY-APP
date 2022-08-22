import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage/SignupPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import TermsPage from "./pages/TermsPage/TermsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useState } from "react";

const container = document.getElementById("root");

const root = createRoot(container);

const RootComponent = () => {
  const [shouldRedirect, setShouldRedirect] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={shouldRedirect ? <Navigate replace to='/login' /> : <App />}
        />
        <Route path='/signup' element={<SignupPage />} />
        <Route
          path='/login'
          element={<LoginPage setShouldRedirect={setShouldRedirect} />}
        />
        <Route path='/reportPage' element={<ReportPage />} />
        <Route path='/termsandconditions' element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(<RootComponent />);

serviceWorkerRegistration.register();

reportWebVitals();
