import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { API_LOCAL } from "../constants";

interface QuizContextType {
	currentQuestionBlock: { [key: string]: string };
	gameInfo: { [key: string]: string };
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: {
	children: ReactNode;
}) => {
	const [gameInfo, setGameInfo] = useState<{[key: string]: string}>({});
	const [currentQuestionBlock, setCurrentQuestionBlock] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		const fetchCurrentBlock = async () => {
			try {
				const gameInfo = await axios.get(`${API_LOCAL}/game/info`);
				setGameInfo(gameInfo.data);
				const response = await axios.get(`${API_LOCAL}/admin/get-quiz/${gameInfo.data.currentQuestionBlock}`);
				setCurrentQuestionBlock(response.data);
			} catch (error) {
				console.error('Error fetching current block:', error);
			}
		};

		fetchCurrentBlock();
	}, []);

	return (
		<QuizContext.Provider value={{ currentQuestionBlock, gameInfo }}>
			{children}
		</QuizContext.Provider>
	);
};

export const useQuizContext = (): QuizContextType => {
	const context = useContext(QuizContext);
	if (!context) {
		throw new Error('useQuizContext must be used within a QuizProvider');
	}
	return context;
};
