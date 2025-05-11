import styles from './Admin.module.scss';
import Button from "../../components/buttons/Button.tsx";
import StartButton from "./buttons/StartButton.tsx";
import { useEffect, useState } from "react";
import NextRoundButton from "./buttons/NextRoundButton.tsx";
import ResultsButton from "./buttons/ResultsButton.tsx";
import ScoreTable from "./ScoreTable.tsx";
import { useSocketContext } from "../../context/SocketContext.tsx";

export default function AdminPage() {
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
	const [currentRound, setCurrentRound] = useState<number>(0);
	const { onlineUsers } = useSocketContext();

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<div className={styles.buttons}>
					<StartButton isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} />
					<NextRoundButton isGameStarted={isGameStarted} setCurrentRound={setCurrentRound} />
					<ResultsButton isGameStarted={isGameStarted} />
					<Button onClick={() => {}} disabled={!isGameStarted}>Екран результатів</Button>
					<Button onClick={() => {}} disabled={!isGameStarted}>Фінальний екран</Button>
				</div>

				<ScoreTable players={onlineUsers} />

				<Button onClick={() => {}} disabled={true}>Перезапустити гру</Button>
			</div>
		</div>
	);
}
