import React, { ReactNode } from 'react';
import { ApplicationLayoutContainer } from './style';

function ApplicationLayout({ children }: { children: ReactNode }) {
	return <ApplicationLayoutContainer>{children}</ApplicationLayoutContainer>;
}

export default ApplicationLayout;
