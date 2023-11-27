import React from 'react';
import { Button } from './style';

interface PlayButtonProps {
	text: string;
}

function PlayButton({ text }: PlayButtonProps) {
	return (
		<Button>
			<div className="play-btn">{text}</div>
		</Button>
	);
}

export default PlayButton;
