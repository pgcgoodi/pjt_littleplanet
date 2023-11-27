import React from 'react';
import Lottie from 'lottie-react';
import CompleteAnimation from './lottie.json';

function PointRightLottie() {
	const style = {
		width: 50,
		height: 50,
	};

	return <Lottie animationData={CompleteAnimation} style={style} />;
}

export default PointRightLottie;
