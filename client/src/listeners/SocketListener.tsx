import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"; // твій контекст сокета
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext.tsx";

export default function SocketListener() {
	const { socket } = useSocketContext();
	const navigate = useNavigate();
	const { gameInfo, refreshData } = useQuizContext();

	useEffect(() => {
		if (!socket) return;

		const handleNextRound = (updatedRound: number) => {
			refreshData();
			navigate(`/round-page?id=${updatedRound}`);
		}

		const handleShowResult = () => {
			navigate("/results");
		};

		const handleFinalPage = () => {
			navigate("/final-page");
		}

		socket.on('start', () => {
			navigate('/round-preview?round=1');
		});
		socket.on("nextRound", handleNextRound);
		socket.on("showResult", handleShowResult);
		socket.on("end", handleFinalPage);

		return () => {
			socket.off('start');
			socket.off("nextRound", handleNextRound);
			socket.off("showResult", handleShowResult);
			socket.off("end", handleFinalPage);
		};
	}, [socket, navigate, gameInfo]);

	return null;
}
