import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { useParams } from 'react-router-dom';
import { WindCarousel } from 'components/common/Carousel/WindCarousel'; // Carousel 컴포넌트의 경로를 적절하게 수정해주세요.
import { GameDetailWrapper } from './style';
import games from '../../dummys/games';
import image1 from '../../assets/images/gamedetail_images/play_image1.png';
import image2 from '../../assets/images/gamedetail_images/play_image2.png';
import image3 from '../../assets/images/gamedetail_images/class_image.png';
import image4 from '../../assets/images/gamedetail_images/school_image.png';

function GameDetailCarousel() {
	const { gameId } = useParams();
	const game = games.find((gm) => gm.id === Number(gameId));
	if (!game) {
		return <p>해당하는 게임 정보가 없습니다.</p>;
	}

	const gameImages = [
		{ src: image1, alt: game.name },
		{ src: image2, alt: game.name },
		{ src: image3, alt: game.name },
		{ src: image4, alt: game.name },
	];

	return (
		<GameDetailWrapper>
			<div className="container">
				<div className="info">
					<p className="text-xl">{game.name}</p>
				</div>
				<div className="game-item">
					<div className="game-img">
						<WindCarousel images={gameImages} />
					</div>
					<div className="game-data">
						{game.description.split('\n').map((line) => (
							<p key={line}>{line}</p>
						))}
					</div>
					<div className="btn-div">
						<div className="btn-div-play">
							{/* 게임 기기연결페이지 생기면 이렇게 바꾸기
								<GameLink to="/gamemachine">
									<PlayButton text="시작하기" />
								</GameLink> */}
							<PlayButton text="게임시작" />
						</div>
					</div>
				</div>
			</div>
		</GameDetailWrapper>
	);
}

export default GameDetailCarousel;
