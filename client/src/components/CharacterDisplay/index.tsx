import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { userEmail } from 'store/RecoilState';
// import { CharacterDisplayWrapper } from './style';

function CharacterDisplay() {
	const [image, setImage] = useState('0');
	const userMail = useRecoilValue(userEmail);
	const websocketHw: string = process.env.REACT_APP_WEBSOCKET_HW!;

	useEffect(() => {
		const socket = io(websocketHw, {
			query: {
				userMail,
				fileName: 'character.png',
			},
			secure: true,
		});

		socket.on('image', (data) => {
			setImage(data.url);
		});

		return () => {
			socket.disconnect();
		};
	}, [userMail, image]);

	return <img className="character" src={image} alt="" />;
}

export default CharacterDisplay;
