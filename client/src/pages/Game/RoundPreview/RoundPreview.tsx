import styles from "./RoundPreview.module.scss";
import { useQuizContext } from "../../../context/QuizContext.tsx";
import { useEffect } from "react";

export default function RoundPreview() {
	const { gameInfo } = useQuizContext();

	useEffect(() => {
		document.title = 'Round preview page';
	}, []);

	return (
		<>
			<div className={styles.previewBackground}></div>
			<div className="flex flex-col justify-center items-center w-screen h-screen space-y-4">
				<h1 className={styles.previewTitle}>РАУНД {+gameInfo.currentRound + 1}</h1>
				<div className={styles.previewDescription}>
					<p>Обдурив - 500 очок</p>
					<p>Сказав правду - 1000 очок</p>
					<p>Ні те, ні се - облизав жабу</p>
				</div>
			</div>
		</>
	);
}
