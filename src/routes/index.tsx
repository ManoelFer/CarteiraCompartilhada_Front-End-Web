import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import { Admin, Beneficiary, NotAllowed, NotFound, SignIn } from "pages";
import { PrivateRoutes } from "components";

export const RoutesApp = (): JSX.Element => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <SignIn />
                } />
                <Route path="/login" element={
                    <SignIn />
                } />


                <Route path="/admin"
                    element={
                        <PrivateRoutes>
                            <Admin />
                        </PrivateRoutes>}
                />

                <Route path="/beneficiary" element={
                    <PrivateRoutes>
                        <Beneficiary />
                    </PrivateRoutes>}
                />
                <Route path="*" element={<NotFound />} />
                <Route path="/forbidden" element={<NotAllowed />} />
            </Routes>
        </BrowserRouter>
    );
}