import {Route, Routes} from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx";
import { DashboardPage } from "../layouts/DashboardPage.jsx";

export const AppRoutes = () => {

    return(
        <Routes>
            {/* Publicas */}
            <Route path="/" element={<AuthPage />}/>

            {/* Protegido por role */}
            <Route path="/dashboard/*" element={<DashboardPage />}/>
            
        </Routes>
    );
}