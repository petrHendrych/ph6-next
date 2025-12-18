'use client';
import React from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

import { mainImages } from '@/data';

gsap.registerPlugin(useGSAP, TextPlugin, SplitText);

const next = 5; // time to change
const fade = 1.5; // fade time

const MainPictures = () => {
	useGSAP(() => {
		const images = gsap.utils.toArray<Element>('#imgContainer .motiv');
		let split = new SplitText('.motiv p', { type: 'chars' }),
			chars = split.chars;

		gsap.set(images[0], { autoAlpha: 1 });

		const crossfade = () => {
			split = new SplitText(images[1], { type: 'chars' });
			chars = split.chars;

			gsap
				.timeline()
				.to(images[0], { autoAlpha: 0, duration: fade })
				.to(images[1], { autoAlpha: 1, duration: fade }, 0)
				.from(
					chars,
					{
						autoAlpha: 0,
						x: -10,
						duration: 0.1,
						ease: 'power2.inOut',
						stagger: 0.035
					},
					1
				);

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			images.push(images.shift()!);
			gsap.delayedCall(next, crossfade);
		};

		gsap.delayedCall(next, crossfade);
	});

	return (
		<div
			id="imgContainer"
			className="relative mt-14 w-full overflow-hidden xl:mt-0"
		>
			{mainImages.map((image, index) => (
				<div
					key={index}
					className="motiv absolute left-0 top-0 w-full opacity-0 first:relative first:opacity-100"
				>
					<Image
						src={`/main/${image.src}.avif`}
						alt="tmp"
						width={0}
						height={0}
						sizes="100vw"
						className="mx-auto h-auto w-full max-w-[2048px]"
						priority
						style={{ width: '100%', height: 'auto' }}
					/>
					<p className="text-shadow-lg xs:text-base absolute bottom-1 left-1 px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-50 sm:text-lg lg:bottom-5 lg:left-2 lg:text-2xl">
						{image.title}
					</p>
				</div>
			))}
		</div>
	);
};

export default MainPictures;
