import React, { useState } from 'react';
import PlayButton from 'components/Button/PlayButton';
import DetailButton from 'components/Button/DetailButton';
import { SimulationWrapper, SimulationLink } from './style';
import simulations from '../../dummys/simulations';
import bannerImg from '../../assets/images/banner1.png';
import NotYetModal from './NotYetModal/NotYetModal';

function Simulation() {
	const [showNotYetModal, setShowNotYetModal] = useState(false);

	const handleClick = () => {
		setShowNotYetModal(true);
	};
	return (
		<SimulationWrapper>
			<div className="m-5">
				<img src={bannerImg} alt="소행성소개배너" />{' '}
			</div>
			{/* <div className="info">
					<p>
						우리 아이 <span className="colored">안전한 생활</span>을 위한 <span className="colored">시뮬레이션</span>!
					</p>
				</div> */}
			{simulations.map((simulation) => (
				<div key={simulation.id} className="simulation-item">
					<div className="simulation-img">
						<img src={simulation.imageUrl} alt={simulation.name} />
					</div>
					<div className="simulation-data">
						<p className="text-2xl font-bold">{simulation.name}</p>
						{simulation.description.split('\n').map((line) => (
							<p key={line}>{line}</p>
						))}
						<div className="need">{simulation.need}</div>
					</div>
					{simulation.id === 1 ? (
						<div className="btn-div">
							<div className="btn-div-detail">
								<SimulationLink to={`/simulationdetail/${simulation.id}`}>
									<DetailButton text="자세히 +" />
								</SimulationLink>
							</div>
							<div className="btn-div-play">
								<SimulationLink to="/simulationmachine">
									<PlayButton text="시작하기" />
								</SimulationLink>
							</div>
						</div>
					) : (
						<div
							role="button"
							tabIndex={0}
							onClick={handleClick}
							onKeyDown={(event) => {
								if (event.key === 'Enter' || event.key === ' ') {
									handleClick();
								}
							}}
						>
							<div className="btn-div-detail">
								<DetailButton text="자세히 +" />
							</div>
							<div className="btn-div-play">
								<PlayButton text="시작하기" />
							</div>
						</div>
					)}
					<NotYetModal isOpen={showNotYetModal} onClose={() => setShowNotYetModal(false)} />
				</div>
			))}
		</SimulationWrapper>
	);
}

export default Simulation;
