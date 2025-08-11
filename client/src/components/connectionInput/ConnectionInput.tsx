import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./ConnectionInput.module.scss";
import { clearMainStatus, setDeviceAsMain } from "../../utils/utils.ts";

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
		<div className={styles.connectionInput}>
			<div>
				<h2>Connect to the server</h2>
				<p>Enter your username</p>
			</div>
			<input type="text" onChange={handleUserNameChange} />
			<button onClick={connect}>Connect</button>
		</div>
	);
}

export default ConnectionInput;
