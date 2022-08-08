import { Route, Routes, BrowserRouter } from "react-router-dom";

import { SignIn, Beneficiary, Admin } from "pages";

export default function PublicRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/beneficiary" element={<Beneficiary />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}