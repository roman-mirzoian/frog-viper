import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSocketContext } from "../../context/SocketContext.tsx";
import Button from "../../components/buttons/Button.tsx";
import StartButton from "./buttons/StartButton.tsx";
import NextRoundButton from "./buttons/NextRoundButton.tsx";
import ResultsButton from "./buttons/ResultsButton.tsx";
import ScoreTable from "./ScoreTable.tsx";
import styles from './Admin.module.scss';
import { API_LOCAL } from "../../constants";

export default function AdminPage() {
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
	const navigate = useNavigate();
	const { socket } = useSocketContext();

	useEffect(() => {
		async function getGameInfo() {
			const gameInfo = await axios.get(`${API_LOCAL}/game/info`);

			return gameInfo.data;
		}

		getGameInfo().then(info => {
			setIsGameStarted(info?.state === 'started');
		});
	}, [isGameStarted]);

	const handleShowRoundPreview = () => {
		socket?.emit('nextRoundPreview');
	}

	const handleStopGame = () => {
		socket?.emit('end');
		setIsGameStarted(false);
	}

	const handleShowPlayerInput = () => {
		socket?.emit('showPlayerInput');
	}

	const handleShowPlayerVote = () => {
		socket?.emit('showPlayerVote');
	}

	const handleRestGame = () => {
		socket?.emit('resetGame');
		setIsGameStarted(false);
	}

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<div className={styles.buttons}>
					<StartButton isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} />
					<Button onClick={handleStopGame} disabled={!isGameStarted}>Фінальний екран</Button>
				</div>

				<div className={styles.buttons}>
					<Button onClick={handleShowRoundPreview} disabled={!isGameStarted}>Показати раунд превʼю</Button>
					<NextRoundButton isGameStarted={isGameStarted} />
					<ResultsButton isGameStarted={isGameStarted} />
				</div>

				<div className={styles.buttons}>
					<Button onClick={handleShowPlayerInput}>Показати ввод для гравців</Button>
					<Button onClick={handleShowPlayerVote}>Показати голосування для гравців</Button>
				</div>

				<ScoreTable />

				<div className={styles.buttons}>
					<Button onClick={() => navigate('/quiz-table')}>Обрати блок питаннь</Button>
					<Button onClick={() => navigate('/quiz-form')}>Додати блок питань</Button>
				</div>

				<Button onClick={handleRestGame}>Скинути гру</Button>
			</div>
		</div>
	);
}
