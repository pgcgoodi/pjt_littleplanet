import React, { useState } from 'react';
import PlayButton from 'components/Button/PlayButton';
import { useParams } from 'react-router-dom';
// import { Carousel } from '@material-tailwind/react';
import { SimulationDetailWrapper, SimulationLink } from './style';
import simulations from '../../dummys/simulations';
import detailImg from '../../assets/images/detail_ver2.png';
import NotYetModal from './NotYetModal/NotYetModal';
import bannerImg from '../../assets/images/banner3.png';

function SimulationDetail() {
	const [showNotYetModal, setShowNotYetModal] = useState(false);

	const { simulationId } = useParams();
	const simulation = simulations.find((sim) => sim.id === Number(simulationId));
	if (!simulation) {
		return <p>해당하는 시뮬레이션 정보가 없습니다.</p>;
	}
	return (
		<SimulationDetailWrapper>
			<div className="simulation-item">
				<div className="simulation-detail-top">
					<div className="simulation-img">
						<img src={simulation.imageUrl} alt={simulation.name} />
					</div>
					<div className="detail-info mt-10" />
					<div className="simulation-data">
						<div className="detail-info mt-10">
							<p className="text-xl">{simulation.name}</p>
						</div>
						{simulation.description.split('\n').map((line) => (
							<p className="description" key={line}>
								{line}
							</p>
						))}
						{simulation.need.split('\n').map((line) => (
							<p className="need" key={line}>
								{line}
							</p>
						))}
					</div>
					<div className="btn-div-play">
						<SimulationLink to="/simulationmachine">
							<PlayButton text="시작하기" />
						</SimulationLink>
						{showNotYetModal && simulation.id === 1 && (
							<NotYetModal isOpen={showNotYetModal} onClose={() => setShowNotYetModal(false)} />
						)}
					</div>
				</div>
				<div>
					<img src={bannerImg} alt={simulation.name} />
				</div>
				<div className="detail-img">
					<img src={detailImg} alt={simulation.name} />
				</div>
			</div>
		</SimulationDetailWrapper>
	);
}

export default SimulationDetail;
