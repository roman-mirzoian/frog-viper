import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./ConnectionInput.module.scss";
import { clearMainStatus, setDeviceAsMain } from "../../utils/utils.ts";
import Button from "../../components/buttons/Button.tsx";

function ConnectionInput() {
	const [userName, setUserName] = useState<string>("Not set");
	const { socket } = useSocketContext();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Player connection page';
	}, []);

	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};

	const connect = () => {
		socket?.emit("connectUser", userName);
		socket?.connect();

		if(userName === 'main') {
			navigate("/main-waiting-page");
			setDeviceAsMain();
		} else {
			navigate("/users-waiting-list");
			clearMainStatus();
			localStorage.setItem('userName', userName);
		}
	};

	return (
		<div className={`${styles.connectionInput} bg-frog-viper`}>
			<div className={styles.connectionInputContent}>
				<div className='flex flex-col justify-center items-center'>
					<h1>Приєднатися до гри</h1>
				</div>
				<label>
					<p>Введіть ваше імʼя</p>
					<input type="text" onChange={handleUserNameChange} />
				</label>
				<Button onClick={connect}>Тиць</Button>
			</div>
		</div>
	);
}

export default ConnectionInput;
