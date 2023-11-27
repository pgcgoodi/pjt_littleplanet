import React from 'react';
import useOpenModal from 'hooks/useModalOpen';
import Button from 'components/common/Button';
import WindModal from 'components/common/Modal/WindModal';
import appQR from 'assets/images/app_qr.png';
import { DownloadModalWrapper } from './style';

const modalContent = (
	<div className="flex flex-column-reverse flex-wrap justify-center">
		<p>QR코드를 스캔하여 앱을 다운받아보세요!</p>
		<img src={appQR} alt="큐알이에요" style={{ width: '70%', marginBottom: '20px' }} />
	</div>
);
function OpenModal() {
	const { isOpenModal, clickModal, closeModal } = useOpenModal();

	return (
		<>
			<DownloadModalWrapper>
				<Button text="앱 다운로드" handleClick={() => clickModal()} />
			</DownloadModalWrapper>
			<WindModal open={isOpenModal} handleClose={closeModal} title="소행성 앱" content={modalContent} />
		</>
	);
}

export default OpenModal;
