import React, { useState, KeyboardEvent } from 'react';
import DetailButton from 'components/Button/DetailButton';
import { NavBarLink } from 'components/common/NavBar/style';
import { Typography } from '@material-tailwind/react';
import { SimulationMainWrapper } from './style';
import simulations from '../../dummys/simulations';
import NotYetModal from './NotYetModal/NotYetModal';

function Simulation() {
	const [showNotYetModal, setShowNotYetModal] = useState(false);
	const [selectedSimulationId, setSelectedSimulationId] = useState<number | null>(null);

	const handleSimulationClick = (id: number) => {
		if (id === 1) {
			// ID가 1인 경우, 페이지 이동
			window.location.href = `/simulationdetail/${id}`;
		} else {
			// 다른 ID의 경우, 모달 표시
			setSelectedSimulationId(id);
			setShowNotYetModal(true);
		}
	};
	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>, id: number) => {
		// Enter 키나 Space 키가 눌렸을 때 클릭 핸들러를 호출
		if (event.key === 'Enter' || event.key === ' ') {
			handleSimulationClick(id);
		}
	};

	return (
		<SimulationMainWrapper>
			<div className="main-container">
				<div className="main-info">
					<p>우리 아이 안전한 생활을 위한 시뮬레이션!</p>
					<div className="main-btn-div">
						<div className="main-btn-div-detail">
							<NavBarLink to="/simulationlist">
								<DetailButton text="더보기 +" />
							</NavBarLink>
						</div>
					</div>
				</div>
				<div className="main-sims">
					{simulations.map((simulation) => (
						<div
							key={simulation.id}
							className="main-simulation-item"
							onClick={() => handleSimulationClick(simulation.id)}
							onKeyDown={(event) => handleKeyDown(event, simulation.id)}
							role="button"
							tabIndex={0}
						>
							<div className="main-simulation-img">
								<div>
									<img
										className="h-96 w-full rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
										src={simulation.imageUrl}
										alt={simulation.name}
									/>
									{showNotYetModal && selectedSimulationId === simulation.id && (
										<NotYetModal isOpen={showNotYetModal} onClose={() => setShowNotYetModal(false)} />
									)}

									<Typography variant="h5" color="blue-gray" className="mt-3 text-center">
										{simulation.name}
									</Typography>
								</div>
							</div>
						</div>
					))}
				</div>
				{/* <div className="main-sims">
					{simulations.map((simulation) => (
						<div key={simulation.id} className="main-simulation-item">
							<div className="main-simulation-img">
								{showNotYetModal && <NotYetModal isOpen={showNotYetModal} onClose={() => setshowNotYetModal(false)} />}

								<SimulationLink to={`/simulationdetail/${simulation.id}`}>
									<img
										className="h-96 w-full rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
										src={simulation.imageUrl}
										alt={simulation.name}
									/>

									<Typography variant="h5" color="blue-gray" className="mt-3 text-center">
										{simulation.name}
									</Typography>
								</SimulationLink>
							</div>
						</div>
					))}
				</div> */}
			</div>
		</SimulationMainWrapper>
	);
}

export default Simulation;
