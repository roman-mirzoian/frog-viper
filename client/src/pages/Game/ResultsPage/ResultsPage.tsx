import React, { useEffect, useState } from "react";
import styles from "./ResultsPage.module.scss";
import { Player } from "../../../types";
import { API_NETWORK } from "../../../constants";

const ResultsPage: React.FC = () => {
	const [players, setPlayers] = useState<Player[]>([]);

	useEffect(() => {
		const getUsers = () => {
			fetch(`${API_NETWORK}/admin/users`)
				.then(res => res.json())
				.then(setPlayers);
		}
		getUsers();
	}, []);

	return (
		<div className={styles.container}>
			<h1>Результати гри</h1>
			<ul className={styles.playerList}>
				{players.map((player) => (
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
