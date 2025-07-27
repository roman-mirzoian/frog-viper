import React, { useEffect, useState } from "react";
import styles from './PlayerOptions.module.scss';
import axios from "axios";
import { API_LOCAL } from "../../../constants";
import { getDeviceId } from "../../../utils/utils.ts";
import { useNavigate } from "react-router-dom";

interface Option {
	deviceId: string;
	roundAnswer: string;
}

const PlayerOptions: React.FC = () => {
	const [options, setOptions] = useState<Option[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function getOptions() {
			const options = await axios.get(`${API_LOCAL}/users/options?deviceId=${getDeviceId()}`);
			return options.data;
		}

		getOptions().then(setOptions);
	}, []);

	const handleSelect = async (option: Option) => {
		await axios.post(`${API_LOCAL}/users/vote`, {
			playerDeviceId: option.deviceId,
		});
		navigate('/round-waiting');
	}

	return (
		<div className={styles.wrapper}>
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
