import React from 'react';
import useMovePage from 'hooks/useMovePage';
import { Typography } from '@material-tailwind/react';
import Button from 'components/common/Button';
import WindModal from 'components/common/Modal/WindModal';
import { EndingModalWrapper } from './style';

// Props 타입 정의
interface EndingModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function EndingModal({ isOpen, onClose }: EndingModalProps) {
	const [movePage] = useMovePage();

	const clickModal = () => {
		onClose(); // 모달 닫기
		movePage('/main'); // 메인 페이지로 이동
	};
	const modalContent = (
		<div className="flex flex-col flex-wrap items-center">
			<Typography variant="h4" className="text-center mb-3">
				다음 행성으로 떠나볼까요?
			</Typography>
			<Button text="나가기" handleClick={() => clickModal()} />
		</div>
	);
	return (
		<EndingModalWrapper>
			<WindModal open={isOpen} handleClose={onClose} title="119시뮬레이션 완료" content={modalContent} />
		</EndingModalWrapper>
	);
}

export default EndingModal;
