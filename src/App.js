import { BrowserRouter as Route, Router, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Task from "./pages/Task";
import Team from "./pages/Team";
import Login from "./pages/Login";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Team />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
