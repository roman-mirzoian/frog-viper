import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext.tsx";
import Button from "../../components/buttons/Button.tsx";
import StartButton from "./buttons/StartButton.tsx";
import NextRoundButton from "./buttons/NextRoundButton.tsx";
import ResultsButton from "./buttons/ResultsButton.tsx";
import ScoreTable from "./ScoreTable.tsx";
import styles from './Admin.module.scss';

export default function AdminPage() {
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
	const [ , setCurrentRound] = useState<number>(0);
	const { onlineUsers } = useSocketContext();
	const navigate = useNavigate();

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<div className={styles.buttons}>
					<StartButton isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} />
					<NextRoundButton isGameStarted={isGameStarted} setCurrentRound={setCurrentRound} />
					<ResultsButton isGameStarted={isGameStarted} />
					<Button onClick={() => {}} disabled={!isGameStarted}>Фінальний екран</Button>
				</div>

				<ScoreTable players={onlineUsers} />

				<div className={styles.buttons}>
					<Button onClick={() => navigate('/quiz-table')}>Обрати блок питаннь</Button>
					<Button onClick={() => navigate('/quiz-form')}>Додати блок питань</Button>
				</div>

				<Button onClick={() => {}} disabled={true}>Перезапустити гру</Button>
			</div>
		</div>
	);
}
