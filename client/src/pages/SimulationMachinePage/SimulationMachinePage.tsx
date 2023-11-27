import React from 'react';
import NavBar from 'components/common/NavBar/NavBar';
import SimulationMachine from 'components/simulationmachine/SimulationMachine/SimulationMachine';
import OpenModal from 'components/simulationmachine/OpenModal/OpenModal';
import HowToUse from 'components/simulationmachine/HowToUse/HowToUse';
import { SimulationMachineWrapper } from './style';

function SimulationMachinePage() {
	return (
		<div>
			<NavBar />
			<SimulationMachineWrapper>
				<div className="container">
					<div className="title-btn">
						<SimulationMachine />
						<OpenModal />
					</div>
					<div className="how-item">
						<HowToUse />
					</div>
				</div>
			</SimulationMachineWrapper>
		</div>
	);
}

export default SimulationMachinePage;
