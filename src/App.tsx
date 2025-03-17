import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage"
import RegisterUserPage from "./pages/RegisterUserPage";
import QueryProvider from "./providers/QueryProvider"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { paths } from "./shared/paths";

function App() {

  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path={paths.MAIN} element={<MainPage />} />
          <Route path={paths.CREATE_USER} element={<RegisterUserPage />} />
          <Route path={paths.LOGIN} element={<LoginPage />} />
        </Routes>
      </Router>
      
    </QueryProvider>
  )
}

export default App
