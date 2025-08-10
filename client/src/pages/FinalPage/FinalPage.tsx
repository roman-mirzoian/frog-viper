import React, { useEffect, useState } from "react";
import styles from './FinalPage.module.scss';
import { API_NETWORK } from "../../constants";
import { Player } from "../../types";

const FinalPage: React.FC = () => {
	const [players, setPlayers] = useState<Player[]>([]);

	useEffect(() => {
		const getUsers = () => {
			fetch(`${API_NETWORK}/admin/users`)
				.then(res => res.json())
				.then(setPlayers);
		}
		getUsers();
	}, []);

	const sortedPlayers = players.sort((a, b) => {
		// @ts-expect-error tmp
		return b.score - a.score;
	});

	return (
		<div className={styles.container}>
			<h1>Переміг {sortedPlayers[0]?.name}</h1>
		</div>
	);
};

export default FinalPage;
