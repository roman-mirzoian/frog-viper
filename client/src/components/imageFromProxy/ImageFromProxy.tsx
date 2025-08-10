import { API_LOCAL } from "../../constants";

export function ImageFromProxy({ url }: { url: string; }) {
	return <img src={`${API_LOCAL}/game/image?url=${encodeURIComponent(url)}`} alt="Image from proxy" />
}