import React, { ReactNode } from 'react';

interface IScene2LayoutProps {
	StepView: ReactNode;
}

function Scene2Layout(props: IScene2LayoutProps) {
	const { StepView } = props;
	return <div>{StepView}</div>;
}

export default Scene2Layout;
