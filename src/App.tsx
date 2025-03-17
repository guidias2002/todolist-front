import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage"
import RegisterUserPage from "./pages/RegisterUserPage";
import QueryProvider from "./providers/QueryProvider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { paths } from "./shared/paths";
import { AuthProvider } from "./providers/AuthProvider";
import PrivateRoute from "./PrivateRoute";

function App() {

  return (
    <QueryProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path={paths.MAIN} element={<MainPage />} />
            </Route>
            <Route path={paths.CREATE_USER} element={<RegisterUserPage />} />
            <Route path={paths.LOGIN} element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryProvider>
  )
}

export default App
