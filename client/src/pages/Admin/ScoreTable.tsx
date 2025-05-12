import { useQuizContext } from "../../context/QuizContext.tsx";
import styles from "./Admin.module.scss";

interface ScoreTableProps {
	players: string[]
}

export default function ScoreTable({ players }: ScoreTableProps) {
	const { currentQuestionBlock } = useQuizContext();

	return (
		<>
			<h2>Поточний блок: {currentQuestionBlock.blockName}</h2>
			<table className={styles.table}>
				<thead>
				<tr>
					<th>Гравець</th>
					<th>Бали</th>
				</tr>
				</thead>
				<tbody>
				{players?.map(player => {
					return 		<tr>
						<td>Player {player}</td>
						<td>10</td>
					</tr>
				})}
				</tbody>
			</table>
		</>
	)
}