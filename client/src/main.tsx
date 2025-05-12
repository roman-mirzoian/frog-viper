import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext.tsx";
import { QuizProvider } from "./context/QuizContext.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<SocketContextProvider>
			<QuizProvider>
				<App />
			</QuizProvider>
		</SocketContextProvider>
	</BrowserRouter>,
);
