import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./QuizForm.module.scss";
import { API_LOCAL } from "../../../constants";

type Question = {
	text: string;
	correctWord: string;
};

type QuizData = {
	questions: Question[];
	imageLinks: string[];
	videoLinks: string[];
};

const quizDataTemplate: QuizData = {
	questions: Array(5).fill({ text: "", correctWord: "" }),
	imageLinks: Array(3).fill(""),
	videoLinks: Array(2).fill(""),
};

const QuizForm: React.FC = () => {
	const [ blockName, setBlockName ] = useState("");
	const [ quizData, setQuizData ] = useState<QuizData>(quizDataTemplate);
	const navigation = useNavigate();

	const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
		const updatedQuestions = [ ...quizData.questions ];
		updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
		setQuizData({ ...quizData, questions: updatedQuestions });
	};

	const handleImageLinkChange = (index: number, value: string) => {
		const updatedLinks = [ ...quizData.imageLinks ];
		updatedLinks[index] = value;
		setQuizData({ ...quizData, imageLinks: updatedLinks });
	};

	const handleVideoLinkChange = (index: number, value: string) => {
		const updatedLinks = [ ...quizData.videoLinks ];
		updatedLinks[index] = value;
		setQuizData({ ...quizData, videoLinks: updatedLinks });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Quiz Data:", { ...quizData, blockName });
		try {
			await axios.post(`${API_LOCAL}/admin/add-quiz`, { ...quizData, blockName });
			setBlockName('');
			setQuizData(quizDataTemplate);
			navigation('/admin');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.pageWrapper}>
			<h1 className={styles.pageTitle}>Створення вікторини</h1>

			<form className={styles.quizForm} onSubmit={handleSubmit}>
				<section>
					<h2>Назва блоку:</h2>
					<div className={styles.questionBlock}>
						<label>
							<input
								type="text"
								value={blockName}
								onChange={(e) => setBlockName(e.target.value)}
								placeholder="Назва блоку..."
								required
							/>
						</label>
					</div>
				</section>

				<section>
					<h2>Питання (з пропущеним словом)</h2>
					{quizData.questions.map((q, i) => (
						<div key={i} className={styles.questionBlock}>
							<label>
								Питання {i + 1}:
								<input
									type="text"
									value={q.text}
									onChange={(e) => handleQuestionChange(i, "text", e.target.value)}
									placeholder="Текст питання..."
									required
								/>
							</label>
							<label>
								Правильне слово:
								<input
									type="text"
									value={q.correctWord}
									onChange={(e) => handleQuestionChange(i, "correctWord", e.target.value)}
									placeholder="Правильне слово"
									required
								/>
							</label>
						</div>
					))}
				</section>

				<section>
					<h2>Зображення</h2>
					{quizData.imageLinks.map((link, i) => (
						<label key={i}>
							Зображення {i + 1}:
							<input
								type="url"
								value={link}
								onChange={(e) => handleImageLinkChange(i, e.target.value)}
								placeholder="https://example.com/image.jpg"
								required
							/>
						</label>
					))}
				</section>

				<section>
					<h2>Відео</h2>
					{quizData.videoLinks.map((link, i) => (
						<label key={i}>
							Відео {i + 1}:
							<input
								type="url"
								value={link}
								onChange={(e) => handleVideoLinkChange(i, e.target.value)}
								placeholder="https://youtube.com/..."
								required
							/>
						</label>
					))}
				</section>

				<div className={styles.actions}>
					<button type="submit">Зберегти вікторину</button>
				</div>
			</form>
		</div>
	);
};

export default QuizForm;
