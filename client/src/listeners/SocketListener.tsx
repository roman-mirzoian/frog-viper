import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"; // твій контекст сокета
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext.tsx";

export default function SocketListener() {
	const { socket } = useSocketContext();
	const navigate = useNavigate();
	const { refreshData } = useQuizContext();

	const handleNextRound = (updatedRound: number) => {
		refreshData();
		navigate(`/round-page?id=${updatedRound}`);
	}

	const handleNextPreview = () => {
		refreshData();
		navigate(`/round-preview`);
	}

	const handleShowResult = () => {
		refreshData();
		navigate("/results");
	};

	const handleFinalPage = () => {
		refreshData();
		navigate("/final-page");
	}

	useEffect(() => {
		if (!socket) return;

		const subscribeEvents = () => {
			socket.on('start', handleNextPreview);
			socket.on("nextRound", handleNextRound);
			socket.on("nextRoundPreview", handleNextPreview);
			socket.on("showResult", handleShowResult);
			socket.on("end", handleFinalPage);
		}

		const unsubscribeEvents = () => {
			socket.off("start");
			socket.off("nextRound", handleNextRound);
			socket.off("nextRoundPreview", handleNextPreview);
			socket.off("showResult", handleShowResult);
			socket.off("end", handleFinalPage);
		}

		// Коли вперше підключаємось або перепідключаємось
		socket.on("connect", () => {
			console.log("[Socket] Connected:", socket.id);
			refreshData();
			unsubscribeEvents();
			subscribeEvents();
		});

		// Якщо ми вже підключені — підписуємо події
		if (socket.connected) {
			subscribeEvents();
		}


		return () => {
			unsubscribeEvents();
			socket.off("connect");
		};
	}, [socket, navigate]);

	return null;
}
