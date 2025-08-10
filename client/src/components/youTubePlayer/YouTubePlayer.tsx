import React, { memo } from "react";
import styles from './YouTubePlayer.module.scss';

interface YouTubePlayerProps {
	url: string;
	width?: string | number;
	height?: string | number;
	className?: string;
}

const validateId = (id: string | null | undefined) =>
	typeof id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null;

export function extractYouTubeId(link: string): string | null {
	console.log({link});
	if (!link) return null;

	// спроба через URL API
	try {
		const cleaned = link.trim();
		const url = new URL(cleaned.includes('://') ? cleaned : `https://${cleaned}`);
		const host = url.hostname.toLowerCase();

		if (host.includes('youtu.be')) {
			const parts = url.pathname.split('/').filter(Boolean);
			return validateId(parts[0] ?? null);
		}

		if (host.includes('youtube.com')) {
			const path = url.pathname;
			// /embed/VIDEOID or /v/VIDEOID
			const embedMatch = path.match(/\/(?:embed|v)\/([A-Za-z0-9_-]{11})/);
			if (embedMatch) return validateId(embedMatch[1]);

			// watch?v=VIDEOID
			const v = url.searchParams.get('v');
			if (v) return validateId(v);

			// sometimes video id is in the pathname (rare)
			const last = path.split('/').filter(Boolean).pop();
			if (last) return validateId(last);
		}
	} catch {
		// якщо URL() кинув — будемо пробувати регуляркою далі
	}

	// Фallback: універсальна регулярка по найпоширенішим шаблонам
	const fallback = link.match(
		/(?:youtube\.com\/.*(?:v=|\/v\/|\/embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
	);
	if (fallback && fallback[1]) return validateId(fallback[1]);

	// Якщо нічого не знайдено — повертаємо null
	return null;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = memo(({
																											 url,
																											 width = 560,
																											 height = 315,
																											 className = '',
																										 }) => {
	const videoId = extractYouTubeId(url);

	if (!videoId) {
		return (
			<div className={`${styles.errorWrap} ${className}`}>
				<div className={styles.errorTitle}>Неможливо визначити YouTube ID</div>
				<div className={styles.hint}>
					Перевірте посилання. Підтримувані формати:
					<ul>
						<li>https://www.youtube.com/watch?v=VIDEO_ID</li>
						<li>https://youtu.be/VIDEO_ID</li>
						<li>https://www.youtube.com/embed/VIDEO_ID</li>
					</ul>
				</div>
			</div>
		);
	}

	const src = `https://www.youtube.com/embed/${videoId}`;

	return (
		<div className={`${styles.playerWrap} ${className}`}>
			<iframe
				src={src}
				width={String(width)}
				height={String(height)}
				title={`youtube-${videoId}`}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
		</div>
	);
});

export default YouTubePlayer;
