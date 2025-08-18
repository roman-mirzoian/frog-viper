import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./QuizForm.module.scss";
import { API_NETWORK } from "../../../constants";

type Question = {
	text: string;
	correctWord: string;
};
export type Media = {
	url: string;
	correctWord: string;
};

type QuizData = {
	questions: Question[];
	imageLinks: Media[];
	videoLinks: Media[];
};

const quizDataTemplate: QuizData = {
	questions: Array(5).fill({ text: "", correctWord: "" }),
	imageLinks: Array(3).fill({ url: "", correctWord: "" }),
	videoLinks: Array(2).fill({ url: "", correctWord: "" }),
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

	const handleImageLinkChange = (index: number, field: string, value: string) => {
		const updatedLinks = [ ...quizData.imageLinks ];
		updatedLinks[index] = { ...updatedLinks[index], [field]: value };
		setQuizData({ ...quizData, imageLinks: updatedLinks });
	};

	const handleVideoLinkChange = (index: number, field: string, value: string) => {
		const updatedLinks = [ ...quizData.videoLinks ];
		updatedLinks[index] = { ...updatedLinks[index], [field]: value };
		setQuizData({ ...quizData, videoLinks: updatedLinks });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await axios.post(`${API_NETWORK}/admin/add-quiz`, { ...quizData, blockName });
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
						<div key={i} className={styles.questionBlock}>
							<label key={i}>
								Зображення {i + 1}:
								<input
									type="url"
									value={link.url}
									onChange={(e) => handleImageLinkChange(i, 'url', e.target.value)}
									placeholder="https://example.com/image.jpg"
									required
								/>
							</label>
							<label>
								Правильне слово:
								<input
									type="text"
									value={link.correctWord}
									onChange={(e) => handleImageLinkChange(i, "correctWord", e.target.value)}
									placeholder="Правильне слово"
									required
								/>
							</label>
						</div>
					))}
				</section>

				<section>
					<h2>Відео</h2>
					{quizData.videoLinks.map((link, i) => (
						<div key={i} className={styles.questionBlock}>
							<label key={i}>
								Відео {i + 1}:
								<input
									type="url"
									value={link.url}
									onChange={(e) => handleVideoLinkChange(i, 'url', e.target.value)}
									placeholder="https://youtube.com/..."
									required
								/>
							</label>
							<label>
								Правильне слово:
								<input
									type="text"
									value={link.correctWord}
									onChange={(e) => handleVideoLinkChange(i, "correctWord", e.target.value)}
									placeholder="Правильне слово"
									required
								/>
							</label>
						</div>
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
