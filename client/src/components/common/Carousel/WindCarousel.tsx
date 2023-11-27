import React from 'react';
import { Carousel } from '@material-tailwind/react';

interface Image {
	src: string;
	alt: string;
}

interface CarouselProps {
	images: Image[];
}

export function WindCarousel({ images }: CarouselProps) {
	return (
		<Carousel className="rounded-xl">
			{images.map((image) => (
				<img key={image.src} src={image.src} alt={image.alt} className="h-full w-full object-cover" />
			))}
		</Carousel>
	);
}
