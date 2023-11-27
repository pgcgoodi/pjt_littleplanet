import { useState } from 'react';

function useOpenModal() {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const clickModal = () => {
		setIsOpenModal(true);
	};

	const closeModal = () => {
		setIsOpenModal(false);
	};

	return { isOpenModal, clickModal, closeModal };
}

export default useOpenModal;
