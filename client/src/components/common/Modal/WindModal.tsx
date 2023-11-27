import React from 'react';
import { Dialog, Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

interface IModalProps {
	title: string;
	content: JSX.Element | string;
	open: boolean;
	handleClose: () => void;
}

function WindModal({ title, content, open, handleClose }: IModalProps) {
	return (
		<Dialog size="xs" open={open} handler={handleClose} className="bg-transparent shadow-none">
			<Card className="mx-auto w-full max-w-[24rem]">
				<CardHeader color="yellow" className="p-4 w-4rem text-center">
					<Typography variant="h5" className="text-black">
						{title}
					</Typography>
				</CardHeader>
				<CardBody>
					<Typography>{content}</Typography>
				</CardBody>
			</Card>
		</Dialog>
	);
}

export default WindModal;
