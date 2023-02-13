import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import Form from "./pages/Form";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import Register from "./pages/Register";

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  // console.log("USER :::>>>", currentUser);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path={`/`}
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path={`/form`}
            element={
              <RequireAuth>
                <Form />
              </RequireAuth>
            }
          />
          <Route path={`/login`} element={<Login />} />
          <Route path={`/register`} element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
