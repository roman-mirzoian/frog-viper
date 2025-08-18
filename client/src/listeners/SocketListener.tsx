import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"; // твій контекст сокета
import { useLocation, useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext.tsx";

export default function SocketListener() {
	const { socket } = useSocketContext();
	const navigate = useNavigate();
	const { refreshData } = useQuizContext();
	const location = useLocation();

	const handleNextRound = (updatedRound: number) => {
		refreshData();
		navigate(`/round-page?id=${updatedRound}`);
	}

	const handleNextPreview = () => {
		refreshData();
		navigate(`/round-preview`);
	}

	const handleShowOptionsPreview = () => {
		refreshData();
		navigate(`/round-options`);
	}

	const handleShowResult = () => {
		refreshData();
		navigate("/results");
	};

	const handleFinalPage = () => {
		refreshData();
		navigate("/final-page");
	}

	const handleResetGame = () => {
		refreshData();

		switch (location.pathname) {
			case '/admin':
			case '/users-waiting-list':
			case '/':
				return;
			case '/round-input':
			case '/round-waiting':
				return navigate('/');
			default:
				navigate("/main-waiting-page");
		}
	}

	useEffect(() => {
		if (!socket) return;

		const subscribeEvents = () => {
			socket.on('start', handleNextPreview);
			socket.on("nextRound", handleNextRound);
			socket.on("nextRoundPreview", handleNextPreview);
			socket.on("showRoundOptionsPreview", handleShowOptionsPreview);
			socket.on("showResult", handleShowResult);
			socket.on("end", handleFinalPage);
			socket.on("resetGame", handleResetGame);
		}

		const unsubscribeEvents = () => {
			socket.off("start");
			socket.off("nextRound", handleNextRound);
			socket.off("nextRoundPreview", handleNextPreview);
			socket.off("showRoundOptionsPreview", handleShowOptionsPreview);
			socket.off("showResult", handleShowResult);
			socket.off("end", handleFinalPage);
			socket.off("resetGame", handleResetGame);
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
