import React, { ReactNode } from 'react';
import { MachineConfirmLayoutContainer } from './style';

interface ITestLayoutProps {
	StepView: ReactNode;
}

function MachineConfirmLayout(props: ITestLayoutProps) {
	const { StepView } = props;
	return (
		<MachineConfirmLayoutContainer>
			<div>{StepView}</div>
		</MachineConfirmLayoutContainer>
	);
}

export default MachineConfirmLayout;
