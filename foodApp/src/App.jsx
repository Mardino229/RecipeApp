import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

import LandingRoute from "./LandingRoute.jsx";
import RequireAuth from "./components/DashboardComponents/RequireAuth.jsx";
import DashboardRoute from "./DashboardRoutes.jsx";
import {ROLE_USER} from "./constants/index.jsx";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/*" element={<LandingRoute />} />
                    <Route element={<RequireAuth allowedRoles={ROLE_USER} />}>
                        <Route path="/dash/*" element={<DashboardRoute />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App;
