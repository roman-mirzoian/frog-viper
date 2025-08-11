import PlayerAvatar from "../../../components/PlayerAvatar.tsx";
import { Player } from "../../../types";

export function PlayerList({
	players,
	numCircles = 4,
}: {
	players: Player[];
	numCircles?: number;
}) {
	const isPlayersConnected = players.length > 0;

	return (
		<div className="h-full flex justify-between items-center">
			{[...Array(numCircles)].map((_, i) => {
				const playerName = players[i]?.name;
				const translateY = i % 2 === 0 ? "-20px" : "20px";

				return (
					<div
						key={i}
						className="flex items-center justify-center"
						style={{ transform: `translateY(${translateY})` }}
					>
						{isPlayersConnected && playerName ? (
							// @ts-expect-error tmp
							<PlayerAvatar iconIndex={i} name={playerName} />
						) : (
							<Circle />
						)}
					</div>
				);
			})}
		</div>
	);
}

function Circle() {
	return (
		<div className="flex items-center justify-center w-24 h-24 border-4 border-white rounded-full bg-transparent">
			<div className="w-6 h-6 bg-white rounded-full"></div>
		</div>
	);
}
