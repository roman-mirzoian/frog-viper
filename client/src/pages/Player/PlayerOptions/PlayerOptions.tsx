import React, { useEffect, useState } from "react";
import styles from './PlayerOptions.module.scss';
import axios from "axios";
import { API_NETWORK } from "../../../constants";
import { getDeviceId } from "../../../utils/utils.ts";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../../../context/QuizContext.tsx";
import { getCurrentQuestion } from "../../Game/RoundPage/RoundPage.tsx";
import HomeButton from "../../../components/player/HomeButton.tsx";

interface Option {
	deviceId: string;
	roundAnswer: string;
}

const PlayerOptions: React.FC = () => {
	const [options, setOptions] = useState<Option[]>([]);
	const navigate = useNavigate();
	const {currentQuestionBlock, gameInfo, refreshData} = useQuizContext();

	useEffect(() => {
		document.title = 'Player vote page';
	}, []);

	useEffect(() => {
		refreshData();
		const currentAnswer = getCurrentQuestion(currentQuestionBlock, +gameInfo.currentRound - 1);

		async function getOptions() {
			const options = await axios.get(`${API_NETWORK}/users/options?deviceId=${getDeviceId()}`);
			return options.data;
		}

		getOptions().then((options: Option[]) => {
			// для правильної відповіді задаємо девайс айді поточного користувача
			setOptions([...options, { deviceId: getDeviceId(), roundAnswer: currentAnswer?.correctWord } as Option]);
		});
	}, [currentQuestionBlock, gameInfo]);

	const handleSelect = async (option: Option) => {
		await axios.post(`${API_NETWORK}/users/vote`, {
			playerDeviceId: option.deviceId,
			// якщо девайсАйді питання співпадає з девайс айді поточного користувача - значить він голосував за правильну відповідь
			isCorrectAnswer: option.deviceId === getDeviceId()
		});
		navigate('/round-waiting');
	}

	return (
		<div className={styles.wrapper}>
			<HomeButton />
			<p className={styles.title}>Оберіть правильний варіант:</p>
			<div className={styles.options}>
				{options.map((option, index) => (
					<button
						key={index}
						className={styles.optionButton}
						onClick={() => handleSelect(option)}
					>
						{option.roundAnswer}
					</button>
				))}
			</div>
		</div>
	);
};

export default PlayerOptions;
