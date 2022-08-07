import { Route, Routes, BrowserRouter } from "react-router-dom";

import { SignIn, Home } from "pages";

export default function PublicRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}