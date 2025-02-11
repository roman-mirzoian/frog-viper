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
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

	useEffect(() => {
		const socket = io("http://localhost:3000/", {
			transports: ["websocket", "polling"],
			autoConnect: false,
		});

		setSocket(socket);
		socket.on("getOnlineUsers", (users: string[]) => {
			setOnlineUsers(users);
		});

		return () => {
			socket.close();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
