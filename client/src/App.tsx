import "./App.css";
import { Route, Routes } from "react-router-dom";
import WaitingList from "./components/waitingList/WaitingList.tsx";
import ConnectionInput from "./components/connectionInput/ConnectionInput.tsx";
import WaitingPage from "./pages/WaitingPage/WaitingPage";
import RoundPreview from "./pages/RoundPreview/RoundPreview";
import RoundPage from "./pages/RoundPage/RoundPage";
import Admin from "./pages/Admin/Admin";
import QuizForm from "./pages/Admin/QuizForm/QuizForm.tsx";
import QuizTable from "./pages/Admin/QuizForm/QuizTable.tsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<ConnectionInput />} />
			<Route path="/users-waiting-list" element={<WaitingList />} />
			<Route path="/main-waiting-page" element={<WaitingPage />} />
			<Route path="/round-preview" element={<RoundPreview />} />
			<Route path="/round-page" element={<RoundPage />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/quiz-table" element={<QuizTable />} />
			<Route path="/quiz-form" element={<QuizForm />} />
		</Routes>
	);
}

export default App;
