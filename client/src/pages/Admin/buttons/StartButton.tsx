import Button from "../../../components/buttons/Button.tsx";
import { useSocketContext } from "../../../context/SocketContext.tsx";
import { ButtonProps } from "../types.ts";

export default function StartButton({ isGameStarted, setIsGameStarted } : ButtonProps) {
	const { socket } = useSocketContext();

	const handleGameStart = () => {
		if(setIsGameStarted) {
			setIsGameStarted(currentState => !currentState);
		}
		socket?.emit('start');
	}

	return <Button onClick={handleGameStart} disabled={isGameStarted}>Почати гру</Button>;
}