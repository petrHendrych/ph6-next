import fs from 'fs';
import path from 'path';

import React from 'react';
import Image from 'next/image';

const POST_FOLDER_NAME = 'main';
const POSTS_DIRECTORY = path.join(process.cwd(), 'public', POST_FOLDER_NAME);

export const getPostLength = (): number =>
	fs.readdirSync(POSTS_DIRECTORY).length;

const MainPictures = () => {
	console.log(getPostLength());
	return (
		<>
			{Array(getPostLength())
				.fill(0)
				.map((_, i) => (
					<Image
						className="absolute left-0 top-0 h-full w-full"
						key={i}
						src={`/main/uvod_${i + 1}.avif`}
						alt="Main slideshow picture"
						width={0}
						height={0}
						sizes="100vw"
						style={{ width: '100%', height: 'auto' }}
						priority
					/>
				))}
		</>
	);
};

export default MainPictures;
