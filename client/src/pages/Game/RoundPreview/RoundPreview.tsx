import { useSearchParams } from "react-router-dom";
import styles from "./RoundPreview.module.scss";

export default function RoundPreview() {
	const [searchParams] = useSearchParams();
	const round = searchParams.get("round");

	return (
		<>
			<div className={styles.previewBackground}></div>
			<div className="flex flex-col justify-center items-center w-screen h-screen space-y-4">
				<h1 className={styles.previewTitle}>РАУНД {round}</h1>
				<div className={styles.previewDescription}>
					<p>Обдурив - 500 очок</p>
					<p>Сказав правду - 1000 очок</p>
					<p>Ні те, ні се - облизав жабу</p>
				</div>
			</div>
		</>
	);
}
