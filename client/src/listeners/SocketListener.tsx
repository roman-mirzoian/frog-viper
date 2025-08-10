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

		const handleShowResult = () => {
			navigate("/results");
		};

		const handleNextRound = (updatedRound: number) => {
			refreshData();
			navigate(`/round-page?id=${updatedRound}`);
		}

		socket.on("showResult", handleShowResult);
		socket.on("nextRound", handleNextRound);

		return () => {
			socket.off("showResult", handleShowResult);
			socket.off("nextRound", handleNextRound);
		};
	}, [socket, navigate, gameInfo]);

	return null;
}
