import styles from './Button.module.scss';

type ButtonProps = {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
};

export default function Button({ children, onClick, disabled = false, type = 'button' }: ButtonProps) {
	return (
		<button className={styles.button} onClick={onClick} disabled={disabled} type={type}>
			{children}
		</button>
	);
}
