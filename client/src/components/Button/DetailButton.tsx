import React from 'react';
import { Button } from './style';

interface DetailButtonProps {
	text: string;
}

function DetailButton({ text }: DetailButtonProps) {
	return (
		<Button>
			<div className="detail-btn">{text}</div>
		</Button>
	);
}

export default DetailButton;
