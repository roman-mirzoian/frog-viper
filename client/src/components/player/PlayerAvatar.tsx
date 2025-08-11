import { PLAYER_ICON_LINKS } from "../../constants";
import { Player } from "../../types";

export default function PlayerAvatar({
	iconIndex,
	name,
	score,
}: Player & { iconIndex: number }) {
	return (
		<div className="flex flex-col items-center">
			<img
				src={PLAYER_ICON_LINKS[iconIndex]}
				alt="User Avatar"
				className="w-24 h-24"
			/>
			<div className="font-bold text-2xl">{name}</div>
			{score ? <div>Score: {score}</div> : null}
		</div>
	);
}
