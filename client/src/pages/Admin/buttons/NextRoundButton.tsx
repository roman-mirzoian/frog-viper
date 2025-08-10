import Button from "../../../components/buttons/Button.tsx";
import { ButtonProps } from "../types.ts";
import { useSocketContext } from "../../../context/SocketContext.tsx";

export default function NextRoundButton({ isGameStarted, currentRound, setCurrentRound }: ButtonProps) {
	const { socket } = useSocketContext();

	const handleNextRound = () => {
		if(setCurrentRound) {
			setCurrentRound((roundFromState) => {
				const updatedRound = (currentRound || roundFromState) + 1;
				socket?.emit('nextRound', updatedRound);
				return updatedRound;
			})
		}
	}

	return <Button onClick={handleNextRound} disabled={!isGameStarted}>Наступний раунд</Button>;
}