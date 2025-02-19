/* eslint-disable react-refresh/only-export-components */
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<{
	socket: typeof Socket | null;
	onlineUsers: string[];
}>({
	socket: null,
	onlineUsers: [],
});

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [socket, setSocket] = useState<typeof Socket | null>(null);
	const [environment, setEnvironment] = useState<string>("development");
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

	useEffect(() => {
		const socketLink =
			environment === "development"
				? "http://localhost:3000/"
				: "https://frog-viper.onrender.com";
		const socket = io(socketLink, {
			transports: ["websocket", "polling"],
			//autoConnect: false,
		});

		setSocket(socket);
		socket?.on("getOnlineUsers", (users: string[]) => {
			setOnlineUsers(users);
		});

		return () => {
			socket?.close();
		};
	}, [environment]);

	const handleEnvironmentChange = () => {
		if (socket) {
			socket.close();
		}
		setEnvironment(prev =>
			prev === "development" ? "production" : "development",
		);
	};

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{/*<button onClick={handleEnvironmentChange}>
				Change environment: {environment}
			</button>*/}
			{children}
		</SocketContext.Provider>
	);
};
