/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
	ReactNode, useRef,
} from "react";
import io, { Socket } from "socket.io-client";
import { getDeviceId, isDeviceMain } from "../utils/utils.ts";
import { API_NETWORK } from "../constants";

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
	const socketRef = useRef<typeof Socket | null>(null);
	const [socket, setSocket] = useState<typeof Socket | null>(null);
	// @ts-expect-error tmp
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [environment, setEnvironment] = useState<string>("development");
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

	const connectSocket = useCallback(() => {
		const socketLink =
			environment === "development"
				? API_NETWORK
				: "https://frog-viper.onrender.com";
		const connectedSocket = io(socketLink, {
			auth: {
				deviceId: getDeviceId(),
			},
			transports: ["websocket", "polling"],
			//autoConnect: false,
			reconnection: true,
			reconnectionAttempts: Infinity,
			reconnectionDelay: 2000,
		});

		socketRef.current = connectedSocket;

		setSocket(connectedSocket);

		connectedSocket.on("connect", () => {
			console.log("Socket connected", connectedSocket.id);
		});

		connectedSocket?.on("getOnlineUsers", (users: string[]) => {
			setOnlineUsers(Object.values(users));
		});

		connectedSocket.on("disconnect", (reason: any) => {
			console.warn("Socket disconnected:", reason);
		});

		connectedSocket.on("connect_error", (err: any) => {
			console.error("Socket connection error:", err.message);
		});
	}, [])

	useEffect(() => {
		connectSocket();

		return () => {
			socket?.close();
		};
	}, [connectSocket]);

	// ручний reconnect
	const reconnect = useCallback(() => {
		console.log('socketRef.current', socketRef.current);
		if (socketRef.current && !socketRef.current.connected) {
			console.log("Manual socket reconnect...");
			socketRef.current.connect();
		}

		if(isDeviceMain()) {
			socketRef.current?.emit("reconnectMain", socketRef.current.id);
		}
	}, []);

	// авто-перепідключення для main
	useEffect(() => {
		if (!isDeviceMain()) return;

		const interval = setInterval(() => {
			console.log('Checking socket connection...');
			if (socketRef.current && !socketRef.current.connected) {
				console.warn("Main is offline, trying to reconnect...");
				socketRef.current.connect();

				socketRef.current.emit("reconnectMain", socketRef.current.id);
			}
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{/*{ socket && <ChangeEnvButton socket={socket} environment={environment} setEnvironment={setEnvironment} /> }*/}
			{isDeviceMain() && (
				<button onClick={reconnect}>
					Reconnect
				</button>
			)}
			{children}
		</SocketContext.Provider>
	);
};

// @ts-expect-error tmp
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ChangeEnvButton({ socket, environment, setEnvironment }: { socket: typeof Socket, environment: string, setEnvironment: React.Dispatch<React.SetStateAction<string>> }) {
	const handleEnvironmentChange = () => {
		if (socket) {
			socket.close();
		}
		setEnvironment(prev =>
			prev === "development" ? "production" : "development"
		);
	};

	return (
		<button onClick={handleEnvironmentChange}>
			Change environment: {environment}
		</button>
	);
}
