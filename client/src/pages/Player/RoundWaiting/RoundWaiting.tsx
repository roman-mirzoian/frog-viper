import React, { useEffect } from "react";
import styles from "./RoundWaiting.module.scss";
import { useSocketContext } from "../../../context/SocketContext.tsx";
import { useNavigate } from "react-router-dom";

const WaitingMessage: React.FC = () => {
	const { socket } = useSocketContext();
	const navigate = useNavigate();

	useEffect(() => {
		socket?.on('showPlayerInput', () => {
			navigate('/round-input');
		});
	}, [navigate, socket]);

	return (
		<div className={styles.wrapper}>
			<p className={styles.message}>Чекайте</p>
		</div>
	);
};

export default WaitingMessage;
