import Button from "../../../components/buttons/Button.tsx";
import { ButtonProps } from "../types.ts";
import { useSocketContext } from "../../../context/SocketContext.tsx";

export default function ResultsButton({ isGameStarted }: ButtonProps) {
	const { socket } = useSocketContext();

	const handleResultView = () => {
		socket?.emit('showResult');
	}

	return <Button onClick={handleResultView} disabled={!isGameStarted}>Показати екран результатів</Button>;
}