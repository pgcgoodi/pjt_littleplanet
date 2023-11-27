import React from 'react';
import { Typography } from '@material-tailwind/react';
// import Button from 'components/common/Button';
import WindModal from 'components/common/Modal/WindModal';
import { NotYetModalWrapper } from './style';

// Props 타입 정의
interface NotYetModalProps {
	isOpen: boolean;
	onClose: () => void;
}

function NotYetModal({ isOpen, onClose }: NotYetModalProps) {
	// const clickModal = () => {
	// 	console.log('닫기눌렀음');
	// 	onClose(); // 모달 닫기
	// };
	const modalContent = (
		<div className="flex flex-col flex-wrap items-center">
			<Typography variant="h4" className="text-center mb-3">
				이 행성은 아직 탐사 전이에요.
			</Typography>{' '}
			<Typography variant="h4" className="text-center mb-3">
				기대해주세요!
			</Typography>
			{/* <Button text="닫기" handleClick={() => clickModal()} /> */}
		</div>
	);
	return (
		<NotYetModalWrapper>
			<WindModal open={isOpen} handleClose={onClose} title="서비스 준비 중" content={modalContent} />
		</NotYetModalWrapper>
	);
}

export default NotYetModal;
