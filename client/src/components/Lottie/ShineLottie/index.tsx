import React from 'react';
import Lottie from 'lottie-react';
import CompleteAnimation from './lottie.json';

function ShineLottie() {
	const style = {
		width: 50,
		height: 50,
	};

	return <Lottie animationData={CompleteAnimation} style={style} />;
}

export default ShineLottie;
