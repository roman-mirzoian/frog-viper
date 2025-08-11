import Button from "../buttons/Button.tsx";
import { useNavigate } from "react-router-dom";

export default function HomeButton() {
	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate("/users-waiting-list");
	};

	return <div style={{marginBottom: '100px'}}><Button onClick={navigateToHome}>Повернутись на головний екран очікування</Button></div>
}