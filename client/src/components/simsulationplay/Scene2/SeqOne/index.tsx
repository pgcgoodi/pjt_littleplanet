import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Alert, Typography } from '@material-tailwind/react';
import { SeqOneWrapper } from './style';
import coach from '../../../../assets/images/coach.png';
import coachNarr from '../../../../assets/music/coach_2.mp3';

interface ISeqOneProps {
	setStep: Dispatch<SetStateAction<number>>;
}

function SeqOne(props: ISeqOneProps) {
	document.body.style.overflow = 'hidden';
	const [showNarr, setShowNarr] = useState(true);
	const { setStep } = props;

	const [coachAudio] = useState(new Audio(coachNarr));

	useEffect(() => {
		coachAudio.play().catch((error) => console.log('자동 재생 실패:', error));
		coachAudio.onended = () => {
			setShowNarr(false);
		};

		const nextSeqTimer = setTimeout(() => {
			setStep(1);
		}, 19000);

		return () => {
			clearTimeout(nextSeqTimer);
		};
	}, []);

	return (
		<SeqOneWrapper>
			{showNarr ? (
				<div className="alert-container">
					<Alert>
						<div className="flex flex-row items-center">
							<img className="w-16 h-14 mr-2" src={coach} alt="하준이" />
							<Typography variant="h3" className="whitespace-nowrap">
								잘했어! 이제 소방관에게 위치를 알려야 해. 여기가 어딘지 주변을 살펴볼까?
							</Typography>
						</div>
					</Alert>
				</div>
			) : (
				<div className="background-image left-right original" />
			)}
		</SeqOneWrapper>
	);
}

export default SeqOne;
