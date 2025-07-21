/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { getDeviceId } from "../utils/utils.ts";
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
	const [socket, setSocket] = useState<typeof Socket | null>(null);
	// @ts-expect-error tmp
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [environment, setEnvironment] = useState<string>("development");
	const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
	const navigation = useNavigate();

	useEffect(() => {
		const socketLink =
			environment === "development"
				// ? "http://localhost:3000/"
				? API_NETWORK
				: "https://frog-viper.onrender.com";
		const socket = io(socketLink, {
			auth: {
				deviceId: getDeviceId(),
			},
			transports: ["websocket", "polling"],
			//autoConnect: false,
		});

		setSocket(socket);
		socket?.on("getOnlineUsers", (users: string[]) => {
			setOnlineUsers(Object.values(users));
		});

		return () => {
			socket?.close();
		};
	}, [environment]);

	useEffect(() => {
		socket?.on("nextRound", (roundNumber: number) => {
			console.log(roundNumber);
				navigation(`/round-page?id=${roundNumber}`);
			}
		)
	}, [socket, navigation]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{/*{ socket && <ChangeEnvButton socket={socket} environment={environment} setEnvironment={setEnvironment} /> }*/}
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
