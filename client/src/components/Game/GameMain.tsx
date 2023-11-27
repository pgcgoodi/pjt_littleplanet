import React, { useState, KeyboardEvent } from 'react';
import DetailButton from 'components/Button/DetailButton';
import { NavBarLink } from 'components/common/NavBar/style';
import { Typography } from '@material-tailwind/react';
import { GameMainWrapper } from './style';
import games from '../../dummys/games';
import NotYetModal from '../Simulation/NotYetModal/NotYetModal';

function Game() {
	const [showNotYetModal, setShowNotYetModal] = useState(false);
	const [selectedGameId, setSelectedGameId] = useState<number | null>(null);

	const handleGameClick = (id: number) => {
		setSelectedGameId(id);
		setShowNotYetModal(true);
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: number) => {
		// Enter 키나 Space 키가 눌렸을 때 클릭 핸들러를 호출
		if (event.key === 'Enter' || event.key === ' ') {
			handleGameClick(id);
		}
	};

	return (
		<GameMainWrapper>
			<div className="container">
				<div className="info">
					<p>
						우리 아이 게임으로 생활지식<span className="colored"> 쑥쑥</span>!
					</p>
					<div className="main-btn-div">
						<div className="main-btn-div-detail">
							<NavBarLink to="/gamelist">
								<DetailButton text="더보기 +" />
							</NavBarLink>
						</div>
					</div>
				</div>
				<div className="main-games">
					{games.map((game) => (
						<div
							key={game.id}
							className="game-item"
							onClick={() => handleGameClick(game.id)}
							onKeyDown={(event) => handleKeyDown(event, game.id)}
							role="button"
							tabIndex={0}
						>
							<div className="game-img">
								<img
									className="h-96 w-full rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
									src={game.imageUrl}
									alt={game.name}
								/>
								{showNotYetModal && selectedGameId === game.id && (
									<NotYetModal isOpen={showNotYetModal} onClose={() => setShowNotYetModal(false)} />
								)}

								<Typography variant="h5" color="blue-gray" className="mt-3 text-center">
									{game.name}
								</Typography>
							</div>
						</div>
					))}
				</div>
			</div>
		</GameMainWrapper>
	);
}

export default Game;
