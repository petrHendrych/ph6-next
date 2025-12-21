'use client';
import React from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

import { previewImages } from '@/data';

const PreviewGrid = () => {
	useGSAP(() => {
		for (let i = 0; i < previewImages.length; i++) {
			gsap.to(`.preview-image-${i}`, {
				scrollTrigger: {
					trigger: `.preview-image-${i}`,
					toggleActions: 'play none none none'
				},
				autoAlpha: 1,
				duration: 0.5
			});
		}
	});

	return (
		<div className="xs:grid-cols-2 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
			{previewImages.map((image, index) => (
				<div
					key={index}
					className={`group relative cursor-pointer overflow-hidden ${image.className}`}
				>
					<Image
						src={`/preview/${image.src}.jpg`}
						alt={`Preview ${index}`}
						width={0}
						height={0}
						sizes="100vw"
						className={`preview-image-${index} invisible h-auto w-full`}
						priority
					/>
					<div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-200 ease-in group-hover:opacity-100">
						<div className="flex h-full translate-y-4 items-center justify-center transition-transform duration-200 ease-out group-hover:translate-y-0">
							<h3 className="text-center text-lg font-bold text-white">
								{image.title}
							</h3>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default PreviewGrid;
