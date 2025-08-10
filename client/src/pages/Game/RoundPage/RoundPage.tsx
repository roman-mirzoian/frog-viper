import styles from "./RoundPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import { API_LOCAL } from "../../../constants";
import { useQuizContext } from "../../../context/QuizContext.tsx";
import YouTubePlayer from "../../../components/youTubePlayer/YouTubePlayer.tsx";

export default function RoundPage() {
	const { currentQuestionBlock, gameInfo } = useQuizContext();
	const [currentQuestion, setCurrentQuestion] = useState<any>(null);

	useEffect(() => {
		if(currentQuestionBlock && gameInfo) {
			const currentQuestion = getCurrentQuestion(currentQuestionBlock, +gameInfo.currentRound);
			setCurrentQuestion(currentQuestion);
		}
	}, [gameInfo, currentQuestionBlock]);

	const currentQuestionMemo = useMemo(() => currentQuestion, [currentQuestion]);

	return (
		<>
			<div className={styles.roundBackground}></div>
			<div className={styles.roundDescription}>
				{currentQuestion?.text && <p>{currentQuestion.text}</p>}
				{+gameInfo.currentRound > 4 && +gameInfo.currentRound < 8 && currentQuestion && (
					<img src={`${API_LOCAL}/game/image?url=${encodeURIComponent(currentQuestion)}`} alt="currentQuestion" />
				)}
				{+gameInfo.currentRound > 7 && currentQuestion && (
					<YouTubePlayer url={currentQuestionMemo} />
				)}
				{!currentQuestion && <div style={{color: "white"}}>Питання вже все</div>}
			</div>
		</>
	);
}

function getCurrentQuestion(currentQuestionBlock: any, currentRound: number ) {
	if(!currentQuestionBlock) return;

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

	if(!block) return;

	const parsedQuestions = JSON.parse(block);
	return parsedQuestions[index];
}
