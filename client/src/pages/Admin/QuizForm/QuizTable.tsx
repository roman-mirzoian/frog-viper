import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './QuizTable.module.scss';

export interface Quiz {
	id: number;
	blockName: string;
	imageLinks: string;
	questions: string;
	videoLinks: string;
}

const API = 'http://localhost:3000';

const QuizTable = () => {
	const [quizesToSelect, setquizesToSelect] = useState<Quiz[]>([]);
	const navigation = useNavigate();

	useEffect(() => {
		async function getQuizes() {
			const quizes = await axios.get(`${API}/admin/quizes`);
			return quizes.data;
		}
		getQuizes().then(setquizesToSelect);
	}, []);

	const handleQuizSelect = async (quizId: number) => {
		await axios.post(`${API}/admin/select-quiz`, { quizId });
		navigation('/admin');
	}

	const handleQuizDelete = async (quizId: number) => {
		await axios.post(`${API}/admin/delete-quiz`, { quizId });
		setquizesToSelect((currentQuizes) => currentQuizes.filter(quiz => quiz.id !== quizId));
	}

	return (
		<div className={styles.tableWrapper}>
			{quizesToSelect?.map((quiz) => (
				<div key={quiz.id} className={styles.card}>
					<div className={styles.header}>
						<h3>{quiz.blockName}</h3>
						<div className="flex gap-10">
							<button onClick={() => handleQuizSelect(quiz.id)} className={styles.selectButton}>
								Обрати цей блок
							</button>
							<button onClick={() => handleQuizDelete(quiz.id)} className={styles.deleteButton}>
								Видалити цей блок
							</button>
						</div>
					</div>

					<div className={styles.section}>
						<h4>Питання:</h4>
						<ul>
							{getArrayFromString(quiz.questions).map((q: {text: string, correctWord: string}, idx: number) => (
								<li key={idx}>
									<strong>{idx + 1}.</strong> {q.text} <em>(Правильне слово: <strong>{q.correctWord}</strong>)</em>
								</li>
							))}
						</ul>
					</div>

					<div className={styles.section}>
						<h4>Зображення:</h4>
						<div className={styles.mediaGrid}>
							{getArrayFromString(quiz.imageLinks).map((img: string, idx: number) => (
								<img key={idx} src={img} alt={`quiz-img-${idx}`} className={styles.image} />
							))}
						</div>
					</div>

					<div className={styles.section}>
						<h4>Відео:</h4>
						<div className={styles.mediaGrid}>
							{getArrayFromString(quiz.videoLinks).map((link: string, idx: number) => (
								<iframe
									key={idx}
									src={link}
									title={`video-${idx}`}
									className={styles.video}
									allowFullScreen
								></iframe>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default QuizTable;

function getArrayFromString(str: string) {
	return JSON.parse(str);
}