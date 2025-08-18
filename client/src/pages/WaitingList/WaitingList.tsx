import { useSocketContext } from "../../context/SocketContext.tsx";
import { useNavigate } from "react-router-dom";
import styles from './WaitingList.module.scss';
import { useEffect } from "react";
import Button from "../../components/buttons/Button.tsx";

function WaitingList() {
	const { socket, onlineUsers } = useSocketContext();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Players waiting list page';
	}, []);

	useEffect(() => {
		socket?.on('showPlayerInput', () => {
			navigate('/round-input');
		});

		return () => {
			socket?.off('showPlayerInput');
		};
	}, [navigate, socket]);

	const disconnect = () => {
		socket?.emit("manualDisconnect", { reason: "user-logout" });
		localStorage.removeItem('userName');
		navigate("/");
	};

	return (
		<div className={`${styles.waitingList} bg-frog-viper`}>
			<div className={styles.waitingListContent}>
				<h2>Вже підключилися:</h2>
				<ul>
					{onlineUsers?.map((user, index) => (
						<li key={index}>{user} {user === localStorage.getItem('userName') ? '(це ти)' : ''}</li>
					))}
				</ul>
				<Button onClick={disconnect}>Відключитися</Button>
			</div>
		</div>
	);
}

export default WaitingList;
