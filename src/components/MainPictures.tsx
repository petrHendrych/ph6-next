'use client';
import React from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { useGSAP } from '@gsap/react';

import TweenTarget = gsap.TweenTarget;

gsap.registerPlugin(useGSAP, TextPlugin);

const next = 5; // time to change
const fade = 1.5; // fade time

const MainPictures = ({ posts }: { posts: string[] }) => {
	useGSAP(() => {
		const imgs: TweenTarget[] = gsap.utils.toArray('#imgContainer .motiv');

		gsap.set(imgs[0], { autoAlpha: 1 });

		const crossfade = () => {
			gsap
				.timeline()
				.to(imgs[0], { autoAlpha: 0, duration: fade })
				.to(imgs[1], { autoAlpha: 1, duration: fade }, 0);

			imgs.push(imgs.shift() as TweenTarget);
			gsap.delayedCall(next, crossfade);
		};

		// gsap.delayedCall(next, crossfade);
	});

	return (
		<div
			id="imgContainer"
			className="relative h-screen w-full overflow-hidden pt-12"
		>
			{posts.map((post, index) => (
				<div
					key={index}
					className="motiv absolute left-0 top-0 h-screen w-full opacity-0 first:opacity-100"
				>
					<Image
						src={`/main/${post}`}
						alt="tmp"
						width={0}
						height={0}
						sizes="100vw"
						className="absolute left-1/2 max-w-[2048] -translate-x-1/2 "
						priority
						style={{ width: '100%', height: 'auto' }}
					/>
				</div>
			))}
		</div>
	);
};

export default MainPictures;
