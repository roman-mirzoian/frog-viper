import { API_NETWORK } from "../../constants";

export function ImageFromProxy({ url }: { url: string; }) {
	return <img src={`${API_NETWORK}/game/image?url=${encodeURIComponent(url)}`} alt="Image from proxy" />
}