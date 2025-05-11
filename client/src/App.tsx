import "./App.css";
import { Route, Routes } from "react-router-dom";
import WaitingList from "./components/WaitingList";
import ConnectionInput from "./components/ConnectionInput";
import WaitingPage from "./pages/WaitingPage/WaitingPage";
import RoundPreview from "./pages/RoundPreview/RoundPreview";
import RoundPage from "./pages/RoundPage/RoundPage";
import Admin from "./pages/Admin/Admin";

function App() {
	return (
		<Routes>
			<Route path="/" element={<ConnectionInput />} />
			<Route path="/users-waiting-list" element={<WaitingList />} />
			<Route path="/main-waiting-page" element={<WaitingPage />} />
			<Route path="/round-preview" element={<RoundPreview />} />
			<Route path="/round-page" element={<RoundPage />} />
			<Route path="/admin" element={<Admin />} />
		</Routes>
	);
}

export default App;
