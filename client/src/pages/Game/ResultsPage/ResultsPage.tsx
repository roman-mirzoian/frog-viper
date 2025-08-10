import React, { useEffect, useState } from "react";
import styles from "./ResultsPage.module.scss";
import { useSocketContext } from "../../../context/SocketContext.tsx";
import { Player } from "../../../types";

const ResultsPage: React.FC = () => {
	const { socket } = useSocketContext();
	const [playersState, setPlayersState] = useState<Player[]>([]);

	useEffect(() => {
		socket?.on('currentPlayersState', (playersState: Player[]) => {
			setPlayersState(playersState);
		});
	}, [socket]);

	return (
		<div className={styles.container}>
			<h1>Результати гри</h1>
			<ul className={styles.playerList}>
				{playersState.map((player) => (
					<li key={player.deviceId} className={styles.playerItem}>
						<span className={styles.playerName}>{player.name}</span>
						<span className={styles.score}>{player.score} очок</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ResultsPage;
