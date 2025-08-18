import React from "react";
import styles from "./TextChip.module.scss";

interface ChipProps {
	children: React.ReactNode;
	className?: string;
}

const TextChip: React.FC<ChipProps> = ({ children, className }) => {
	return (
		<span className={`${styles.textChip} ${className || ""}`}>
      {children}
    </span>
	);
};

export default TextChip;
