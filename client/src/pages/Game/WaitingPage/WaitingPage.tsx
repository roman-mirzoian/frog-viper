import { useEffect, useState } from "react";
import Logo from "../../../assets/logo.jpg";
import { useSocketContext } from "../../../context/SocketContext.tsx";
import { Player } from "../../../types";
import { PlayerList } from "./PlayerList.tsx";
import { useNavigate } from "react-router-dom";

export default function WaitingPage() {
	const [players, setPlayers] = useState<Player[]>([]);
	const { onlineUsers, socket } = useSocketContext();
	const navigate = useNavigate();

	useEffect(() => {
		setPlayers(
			onlineUsers?.map((user: string) => ({
				name: user,
			})),
		);
	}, [onlineUsers]);

	useEffect(() => {
		socket?.on('start', () => {
			navigate('/round-preview?round=1');
		});

		return () => {
			socket?.off('start');
		};
	}, [navigate, socket]);

	return (
		<div className="w-screen h-screen bg-frog-viper">
			<div className="flex w-full h-full flex-col justify-center">
				<div className="w-full flex justify-center gap-20">
					<img src={Logo} alt="logo" className="w-[250px] h-[250px]" />
				</div>
				<div className="w-screen h-[300px] bg-gradient-to-b from-[#351F27] via-[#441F26] via-[#522030] via-[#461F2F] via-[#381F26] to-[#491F28] px-[100px] py-[10px]">
					<PlayerList players={players} />
				</div>
			</div>
		</div>
	);
}
