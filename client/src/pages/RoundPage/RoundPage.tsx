import styles from "./RoundPage.module.scss";
import { useSocketContext } from "../../context/SocketContext.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoundPage() {
	const { socket } = useSocketContext();
	const navigation = useNavigate();

	useEffect(() => {
		socket?.on('showResult', () => {
			console.log("SHOW RESULT");
			navigation('/results');
		});
	}, []);

	return (
		<>
			<div className={styles.roundBackground}></div>
			<div className={styles.roundDescription}>
				<p>За словами чоловіка дружини чоловік має право на ........ .</p>
			</div>
		</>
	);
}
