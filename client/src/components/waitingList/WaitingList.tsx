import { useSocketContext } from "../../context/SocketContext.tsx";
import { useNavigate } from "react-router-dom";
import styles from './WaitingList.module.scss';
import { useEffect } from "react";

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
		<div className={styles.waitingList}>
			<p>Connected users:</p>
			<ul>
				{onlineUsers?.map((user, index) => (
					<li key={index}>{user} {user === localStorage.getItem('userName') ? '(це ти)' : ''}</li>
				))}
			</ul>
			<button onClick={disconnect}>Disconnect</button>
		</div>
	);
}

export default WaitingList;
