import React from 'react';
import GameDetailCarousel from 'components/Game/GameDetailCarousel';
import NavBar from '../components/common/NavBar/NavBar';
// import GameDetail from '../components/Game/GameDetail';

function GameDetailPage() {
	return (
		<div>
			<NavBar />
			<hr />
			<GameDetailCarousel />
		</div>
	);
}

export default GameDetailPage;
