import Button from "../../../components/buttons/Button.tsx";
import { ButtonProps } from "../types.ts";
import { useSocketContext } from "../../../context/SocketContext.tsx";
import { useQuizContext } from "../../../context/QuizContext.tsx";

export default function NextRoundButton({ isGameStarted }: ButtonProps) {
	const { socket } = useSocketContext();
	const { gameInfo, refreshData } = useQuizContext();

	const handleNextRound = () => {
			socket?.emit('nextRound', +gameInfo.currentRound + 1);
			refreshData();
	}

	return <Button onClick={handleNextRound} disabled={!isGameStarted}>Наступний раунд</Button>;
}