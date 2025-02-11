import { useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

function ConnectionInput() {
	const [userName, setUserName] = useState<string>("Not set");

	const { socket } = useSocketContext();

	const navigate = useNavigate();

	const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserName(e.target.value);
	};

	const connect = () => {
		socket?.emit("connectUser", userName);
		socket?.connect();
		navigate("/waitinglist");
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "1rem",
			}}
		>
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
