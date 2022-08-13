import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import { Admin, Beneficiary, NotAllowed, NotFound, SignIn } from "pages";
import { PrivateRoute } from "components/PrivateRoute";

export const RoutesApp = (): JSX.Element => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<SignIn />} />


                <Route path="/admin"
                    element={
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>}
                />

                <Route path="/beneficiary" element={
                    <PrivateRoute>
                        <Beneficiary />
                    </PrivateRoute>}
                />
                <Route path="*" element={<NotFound />} />
                <Route path="/forbidden" element={<NotAllowed />} />
            </Routes>
        </BrowserRouter>
    );
}