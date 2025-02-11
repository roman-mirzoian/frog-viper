import "./App.css";
import { Route, Routes } from "react-router-dom";
import WaitingList from "./components/WaitingList";
import ConnectionInput from "./components/ConnectionInput";

function App() {
	return (
		<Routes>
			<Route path="/" element={<ConnectionInput />} />
			<Route path="/waitinglist" element={<WaitingList />} />
		</Routes>
	);
}

export default App;
