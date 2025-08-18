import { useQuizContext } from "../../context/QuizContext.tsx";
import styles from "./Admin.module.scss";
import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext.tsx";
import { Player } from "../../types";

export default function ScoreTable() {
	const { currentQuestionBlock } = useQuizContext();
	const { socket } = useSocketContext();
	const [playersState, setPlayersState] = useState<Player[]>([]);

	useEffect(() => {
		socket?.on('currentPlayersState', (playersState: Player[]) => {
			setPlayersState(playersState);
		});
	}, [socket]);

	return (
		<>
			<h2>Поточний блок: {currentQuestionBlock.blockName}</h2>
			<table className={styles.table}>
				<thead>
				<tr>
					<th>Гравець</th>
					<th>Бали</th>
					<th>Поточна відповідь</th>
				</tr>
				</thead>
				<tbody>
				{playersState?.length === 0 && <EmptyRow />}
				{playersState?.map(player => {
					return <tr key={player.deviceId}>
						<td>{player.name}</td>
						<td>{player.score}</td>
						<td>{player.roundAnswer}</td>
					</tr>
				})}
				</tbody>
			</table>
		</>
	)
}

function EmptyRow() {
	return <tr><td>-</td><td>-</td><td>-</td></tr>;
}