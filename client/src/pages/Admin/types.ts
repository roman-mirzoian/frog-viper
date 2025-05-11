export interface ButtonProps {
	isGameStarted: boolean;
	setIsGameStarted?: React.Dispatch<React.SetStateAction<boolean>>;
	currentRound?: number;
	setCurrentRound?: React.Dispatch<React.SetStateAction<number>>;
}