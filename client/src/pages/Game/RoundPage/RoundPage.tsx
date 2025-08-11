import styles from "./RoundPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useQuizContext } from "../../../context/QuizContext.tsx";
import YouTubePlayer from "../../../components/youTubePlayer/YouTubePlayer.tsx";
import { ImageFromProxy } from "../../../components/imageFromProxy/ImageFromProxy.tsx";

export default function RoundPage() {
	const { currentQuestionBlock, gameInfo } = useQuizContext();
	const [currentQuestion, setCurrentQuestion] = useState<any>(null);

	useEffect(() => {
		if(currentQuestionBlock && gameInfo) {
			const currentQuestion = getCurrentQuestion(currentQuestionBlock, +gameInfo.currentRound - 1);
			setCurrentQuestion(currentQuestion);
		}
	}, [gameInfo, currentQuestionBlock]);

	const currentQuestionMemo = useMemo(() => currentQuestion, [currentQuestion]);

	return (
		<>
			<div className={styles.roundBackground}></div>
			<div className={styles.roundDescription}>
				{currentQuestion?.text && <p>{currentQuestion.text}</p>}
				{+gameInfo.currentRound - 1 > 4 && +gameInfo.currentRound - 1 < 8 && currentQuestion && (
					<ImageFromProxy  url={currentQuestion.url} />
				)}
				{+gameInfo.currentRound - 1 > 7 && currentQuestion && (
					<YouTubePlayer url={currentQuestionMemo.url} />
				)}
				{!currentQuestion && <div style={{color: "white"}}>Питання вже все</div>}
			</div>
		</>
	);
}

export function getCurrentQuestion(currentQuestionBlock: any, currentRound: number ) {
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
