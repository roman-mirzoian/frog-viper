import RoundPage, { getCurrentQuestion } from "../RoundPage/RoundPage.tsx";
import { useEffect, useState } from "react";
import { Player } from "../../../types";
import { useSocketContext } from "../../../context/SocketContext.tsx";
import axios from "axios";
import { API_NETWORK } from "../../../constants";
import TextChip from "../../../components/textChip/TextChip.tsx";
import styles from "./RoundOptions.module.scss";
import { useQuizContext } from "../../../context/QuizContext.tsx";

export default function RoundOptions() {
	const { socket } = useSocketContext();
	const { currentQuestionBlock, gameInfo } = useQuizContext();
	const [answers, setAnswers] = useState<Player[]>([]);
	const [playersState, setPlayersState] = useState<Player[]>([]);
	const [correctAnswer, setCorrectAnswer] = useState('');

	useEffect(() => {
		async function getCurrentAnswers() {
			const answers = await axios.get(`${API_NETWORK}/users/current-answers`);
			return answers.data;
		}

		getCurrentAnswers().then((answersFromServer) => {
			setAnswers(answersFromServer);
			setPlayersState(answersFromServer);
		});

		setCorrectAnswer(getCurrentQuestion(currentQuestionBlock, +gameInfo.currentRound - 1)?.correctWord);
	}, [currentQuestionBlock, gameInfo]);

	useEffect(() => {
		socket?.on('currentPlayersState', (playersState: Player[]) => {
				setPlayersState(playersState);
		});

		if (!playersState.length) {
			setPlayersState(answers);
		}
	}, [socket]);

	const shuffledOptions = getShuffledOptions(playersState, correctAnswer);

	return <RoundPage>
		<div className={styles.roundOptions}>
			{shuffledOptions.map((option, index) => (
				<TextChip key={index}>{option}</TextChip>
			))}
		</div>
	</RoundPage>
}

export function getShuffledOptions(playersState: Player[], correctAnswer: string) {
	// беремо лише відповіді гравців
	const arr = playersState
		.filter((p) => p.roundAnswer)
		.map((p) => p.roundAnswer!);

	// додаємо правильну відповідь, якщо потрібно
	if (playersState.length >= 4 && correctAnswer) {
		arr.push(correctAnswer);
	}

	// Fisher–Yates shuffle
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}
