import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage/SignupPage";
import ReportPage from "./pages/ReportPage/ReportPage";
import TermsPage from "./pages/TermsPage/TermsPage";
import LoginPage from "./pages/LoginPage/LoginPage";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/reportPage' element={<ReportPage />} />
      <Route path='/termsandconditions' element={<TermsPage />} />
    </Routes>
  </BrowserRouter>
);

serviceWorkerRegistration.register();

reportWebVitals();
