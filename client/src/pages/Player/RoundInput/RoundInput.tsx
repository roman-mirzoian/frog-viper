import React, { useEffect, useState } from "react";
import styles from "./RoundInput.module.scss";
import axios from "axios";
import { API_NETWORK } from "../../../constants";
import { useNavigate } from "react-router-dom";
import HomeButton from "../../../components/player/HomeButton.tsx";

const RoundInput: React.FC = () => {
	const [value, setValue] = useState("");
	const navigation = useNavigate();

	useEffect(() => {
		document.title = 'Player round input';
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!value.trim()) {
			return;
		}

		const deviceId = localStorage.getItem('deviceId');
		try {
			await axios.post(`${API_NETWORK}/users/answer`, { deviceId, answer: value.trim() });
			setValue("");

			navigation('/round-waiting');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className={styles.page}>
			<div className={styles.container}>
			<HomeButton />
				<label htmlFor="answer" className={styles.label}>
					Впишіть ваш варіант:
				</label>
				<input
					id="answer"
					type="text"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Ваш варіант..."
					className={styles.input}
				/>
				<button onClick={handleSubmit} className={styles.button}>
					Відправити
				</button>
			</div>
		</div>
	);
};

export default RoundInput;
