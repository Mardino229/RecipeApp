import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import LandingRoute from "./LandingRoute.jsx";
import RequireAuth from "./components/DashboardComponents/RequireAuth.jsx";
import DashboardRoute from "./DashboardRoutes.jsx";
import {ROLE_USER} from "./constants/index.jsx";
import PersistLogin from "./components/DashboardComponents/PersistLogin.jsx";


function App() {
    return (
        <>
            <Router  basename="/RecipeApp">
                <Routes>
                    <Route path="*" element={<LandingRoute />} />
                    <Route element={<PersistLogin/>}>
                        <Route element={<RequireAuth allowedRoles={ROLE_USER} />}>
                            <Route path="dash/*" element={<DashboardRoute />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App;
