import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext.tsx";
import Button from "../../components/buttons/Button.tsx";
import StartButton from "./buttons/StartButton.tsx";
import NextRoundButton from "./buttons/NextRoundButton.tsx";
import ResultsButton from "./buttons/ResultsButton.tsx";
import ScoreTable from "./ScoreTable.tsx";
import styles from './Admin.module.scss';
import { useQuizContext } from "../../context/QuizContext.tsx";
import { Socket } from "socket.io-client";

export default function AdminPage() {
	const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
	const { gameInfo, refreshData } = useQuizContext();
	const { socket } = useSocketContext();

	useEffect(() => {
		document.title = 'Admin page';
	}, []);

	useEffect(() => {
		refreshData();
		setIsGameStarted(gameInfo?.state === 'started');
	}, [isGameStarted, gameInfo]);

	return (
		<div className={styles.page}>
			<div className={styles.inner}>
				<StartStopSection isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} socket={socket} />
				<GameSection isGameStarted={isGameStarted} socket={socket} />
				<PlayersSection socket={socket} />
				<ScoreTable />
				<QuestionsSection />
				<ResetSection socket={socket} setIsGameStarted={setIsGameStarted} />
			</div>
		</div>
	);
}

function StartStopSection({ socket, isGameStarted, setIsGameStarted }: {isGameStarted: boolean, setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>, socket?: typeof Socket | null}) {
	const handleStopGame = () => {
		socket?.emit('end');
		setIsGameStarted(false);
	}

	return <div className={styles.buttons}>
				<StartButton isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} />
				<Button onClick={handleStopGame} disabled={!isGameStarted}>Фінальний екран</Button>
			</div>
}

function GameSection({ socket, isGameStarted }: {isGameStarted: boolean, socket?: typeof Socket | null}) {
	const handleShowRoundPreview = () => {
		socket?.emit('nextRoundPreview');
	}

	const handleShowRoundOptionPreview = () => {
		socket?.emit('showRoundOptionsPreview');
	}

	return <div className={styles.buttons}>
		<Button onClick={handleShowRoundPreview} disabled={!isGameStarted}>Показати раунд превʼю</Button>
		<NextRoundButton isGameStarted={isGameStarted} />
		<Button onClick={handleShowRoundOptionPreview} disabled={!isGameStarted}>Показати питання + відповіді гравців</Button>
		<ResultsButton isGameStarted={isGameStarted} />
	</div>
}

function PlayersSection({ socket }: { socket?: typeof Socket | null }) {
	const handleShowPlayerInput = () => {
		socket?.emit('showPlayerInput');
	}

	const handleShowPlayerVote = () => {
		socket?.emit('showPlayerVote');
	}

	return <div className={styles.buttons}>
		<Button onClick={handleShowPlayerInput}>Показати ввод для гравців</Button>
		<Button onClick={handleShowPlayerVote}>Показати голосування для гравців</Button>
	</div>
}

function QuestionsSection() {
	const navigate = useNavigate();

	return <div className={styles.buttons}>
		<Button onClick={() => navigate('/quiz-table')}>Обрати блок питаннь</Button>
		<Button onClick={() => navigate('/quiz-form')}>Додати блок питань</Button>
	</div>
}

function ResetSection({socket, setIsGameStarted}: {socket?: typeof Socket | null, setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>}) {
	const handleResetGame = () => {
		socket?.emit('resetGame');
		setIsGameStarted(false);
	}

	return <Button onClick={handleResetGame}>Скинути гру</Button>
}
