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
            <Router>
                <Routes>
                    <Route path="/recipeapp/*" element={<LandingRoute />} />
                    <Route element={<PersistLogin/>}>
                        <Route element={<RequireAuth allowedRoles={ROLE_USER} />}>
                            <Route path="recipeapp/dash/*" element={<DashboardRoute />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App;
