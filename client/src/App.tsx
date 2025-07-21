import "./App.css";
import { Route, Routes } from "react-router-dom";
import WaitingList from "./components/waitingList/WaitingList.tsx";
import ConnectionInput from "./components/connectionInput/ConnectionInput.tsx";
import WaitingPage from "./pages/Game/WaitingPage/WaitingPage";
import RoundPreview from "./pages/Game/RoundPreview/RoundPreview";
import RoundPage from "./pages/Game/RoundPage/RoundPage";
import Admin from "./pages/Admin/Admin";
import QuizForm from "./pages/Admin/QuizForm/QuizForm.tsx";
import QuizTable from "./pages/Admin/QuizForm/QuizTable.tsx";
import RoundInput from "./pages/Player/RoundInput/RoundInput.tsx";
import RoundWaiting from "./pages/Player/RoundWaiting/RoundWaiting.tsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<ConnectionInput />} />

			{/* game */}
			<Route path="/users-waiting-list" element={<WaitingList />} />
			<Route path="/main-waiting-page" element={<WaitingPage />} />

			<Route path="/round-preview" element={<RoundPreview />} />
			<Route path="/round-page" element={<RoundPage />} />

			{/* admin */}
			<Route path="/admin" element={<Admin />} />
			<Route path="/quiz-table" element={<QuizTable />} />
			<Route path="/quiz-form" element={<QuizForm />} />

			{/* player */}
			<Route path="/round-input" element={<RoundInput />} />
			<Route path="/round-waiting" element={<RoundWaiting />} />
		</Routes>
	);
}

export default App;
