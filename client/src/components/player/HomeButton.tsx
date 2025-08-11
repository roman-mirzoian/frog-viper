import Button from "../buttons/Button.tsx";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate("/users-waiting-list");
	};

	return <Button onClick={navigateToHome}>Повернутись головний екран очікування</Button>
}