import styles from "./RoundPage.module.scss";
import { useSocketContext } from "../../../context/SocketContext.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_LOCAL } from "../../../constants";
import { useQuizContext } from "../../../context/QuizContext.tsx";
import YouTubePlayer from "../../../components/youTubePlayer/YouTubePlayer.tsx";

export default function RoundPage() {
	const { currentQuestionBlock } = useQuizContext();
	const { socket } = useSocketContext();
	const navigation = useNavigate();
	const [gameInfo, setGameInfo] = useState<any>([]);
	const [currentQuestion, setCurrentQuestion] = useState<any>(null);

	useEffect(() => {
		socket?.on('showResult', () => {
			console.log("SHOW RESULT");
			navigation('/results');
		});
	}, []);

	useEffect(() => {
		async function getGameInfo() {
			const game = await axios.get(`${API_LOCAL}/game/info`);

			return game.data;
		}

		getGameInfo().then(info => {
			setGameInfo(info);

			if(currentQuestionBlock) {
				const currentQuestion = getCurrentQuestion(currentQuestionBlock, info);
				console.log({currentQuestion});
				setCurrentQuestion(currentQuestion);
			}
		});
	}, []);

	return (
		<>
			<div className={styles.roundBackground}></div>
			<div className={styles.roundDescription}>
				{currentQuestion?.text && <p>{currentQuestion.text}</p>}
				{gameInfo.currentRound > 4 && gameInfo.currentRound < 8 && currentQuestion && (
					<img src={`${API_LOCAL}/game/image?url=${encodeURIComponent(currentQuestion)}`} alt="currentQuestion" />
				)}
				{gameInfo.currentRound > 7 && currentQuestion && (
					<YouTubePlayer url={currentQuestion} />
				)}
			</div>
		</>
	);
}

function getCurrentQuestion(currentQuestionBlock: any, getGameInfo: any ) {
	if(!currentQuestionBlock) return;

	const currentRound = getGameInfo.currentRound;

	let block = currentQuestionBlock.questions;
	let index = currentRound;
	if(currentRound > 4 && currentRound < 8) {
		block = currentQuestionBlock.imageLinks;
		index = currentRound - 5;
	}
	if(currentRound > 7) {
		block = currentQuestionBlock.videoLinks;
		index = currentRound - 8;
	}

	const parsedQuestions = JSON.parse(block);
	return parsedQuestions[index];
}
