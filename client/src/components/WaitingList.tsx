import { useSocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";

function WaitingList() {
	const { socket, onlineUsers } = useSocketContext();
	const navigate = useNavigate();

	const disconnect = () => {
		socket?.disconnect();
		navigate("/");
	};

	return (
		<div>
			<p>Connected users</p>
			<ul>
				{onlineUsers.map((user, index) => (
					<li key={index}>{user}</li>
				))}
			</ul>
			<button onClick={disconnect}>Disconnect</button>
		</div>
	);
}

export default WaitingList;
