import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./hooks/UserContext";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import HomePage from "./pages/Home";
import ProtectedRoutes from "./components/services/ProtectedRoutes";

function App() {
	return (
		<BrowserRouter>
			<UserContextProvider>
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/" element={<ProtectedRoutes />}>
						<Route path="/Home" element={<HomePage />} />
					</Route>
				</Routes>
			</UserContextProvider>
		</BrowserRouter>
	);
}

export default App;
