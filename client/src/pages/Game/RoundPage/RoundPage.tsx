import styles from "./RoundPage.module.scss";
import { useEffect, useMemo, useState } from "react";
import { useQuizContext } from "../../../context/QuizContext.tsx";
import YouTubePlayer from "../../../components/youTubePlayer/YouTubePlayer.tsx";
import { ImageFromProxy } from "../../../components/imageFromProxy/ImageFromProxy.tsx";

export default function RoundPage({ children }: { children?: React.ReactNode}) {
	const { currentQuestionBlock, gameInfo } = useQuizContext();
	const [currentQuestion, setCurrentQuestion] = useState<any>(null);

	useEffect(() => {
		document.title = 'Round page';
	}, []);

	useEffect(() => {
		if(currentQuestionBlock && gameInfo) {
			const currentQuestion = getCurrentQuestion(currentQuestionBlock, +gameInfo.currentRound - 1);
			setCurrentQuestion(currentQuestion);
		}
	}, [gameInfo, currentQuestionBlock]);

	const currentQuestionMemo = useMemo(() => currentQuestion, [currentQuestion]);

	const currentRoundView = () => {
		if (!currentQuestion) {
			return <div style={{color: "white"}}>Питання вже все</div>
		}

		if (currentQuestion?.text) {
			return <p>{currentQuestion.text}</p>;
		}

		const currentIndex = +gameInfo.currentRound - 1;

		if (currentIndex > 4 && currentIndex < 8 && currentQuestion) {
			return <ImageFromProxy  url={currentQuestion.url} />
		}

		if (currentIndex > 7 && currentQuestion) {
			return <YouTubePlayer url={currentQuestionMemo.url} />
		}
	}

	return (
		<>
			<div className={styles.roundBackground}></div>
			<div className={styles.roundDescription} style={{marginTop: currentQuestion && children ? "-300px": "0"} }>
				{currentRoundView()}
			</div>
			{currentQuestion && children && <>{children}</>}
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
