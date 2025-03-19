import "./App.css";
import { Route, Routes } from "react-router-dom";
import WaitingList from "./components/WaitingList";
import ConnectionInput from "./components/ConnectionInput";
import WaitingPage from "./pages/WaitingPage/WaitingPage";
import RoundPreview from "./pages/RoundPreview/RoundPreview";
import RoundPage from "./pages/RoundPage/RoundPage";

function App() {
	return (
		<Routes>
			<Route path="/" element={<ConnectionInput />} />
			<Route path="/waiting-list" element={<WaitingList />} />
			<Route path="/waiting-page" element={<WaitingPage />} />
			<Route path="/round-preview" element={<RoundPreview />} />
			<Route path="/round-page" element={<RoundPage />} />
		</Routes>
	);
}

export default App;
