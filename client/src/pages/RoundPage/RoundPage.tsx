import styles from "./RoundPage.module.scss";

export default function RoundPage() {
	return (
		<>
			<div className={styles.roundBackground}></div>
			<div className={styles.roundDescription}>
				<p>За словами чоловіка дружини чоловік має право на ........ .</p>
			</div>
		</>
	);
}
