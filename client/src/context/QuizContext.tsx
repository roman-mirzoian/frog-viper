import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react";
import axios from "axios";
import { API_NETWORK } from "../constants";

interface QuizContextType {
	currentQuestionBlock: { [key: string]: string };
	gameInfo: { [key: string]: string };
	refreshData: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: {
	children: ReactNode;
}) => {
	const [gameInfoRaw, setGameInfoRaw] = useState<{[key: string]: string}>({});
	const [currentQuestionBlockRaw, setCurrentQuestionBlockRaw] = useState<{ [key: string]: string }>({});

	const fetchCurrentBlock = async () => {
		try {
			const gameInfo = await axios.get(`${API_NETWORK}/game/info`);
			setGameInfoRaw(gameInfo.data);
			const response = await axios.get(`${API_NETWORK}/admin/get-quiz/${gameInfo.data.currentQuestionBlock}`);
			setCurrentQuestionBlockRaw(response.data);
		} catch (error) {
			console.error('Error fetching current block:', error);
		}
	};

	useEffect(() => {
		fetchCurrentBlock();
	}, []);

	const gameInfo = useMemo(() => gameInfoRaw, [JSON.stringify(gameInfoRaw)]);
	const currentQuestionBlock = useMemo(() => currentQuestionBlockRaw, [JSON.stringify(currentQuestionBlockRaw)]);

	return (
		<QuizContext.Provider value={{ currentQuestionBlock, gameInfo, refreshData: fetchCurrentBlock }}>
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
