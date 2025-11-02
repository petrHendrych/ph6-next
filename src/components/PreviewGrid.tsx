import React from 'react';
import Image from 'next/image';

import { previewImages } from '@/data';

const PreviewGrid = () => (
	<div
		id="preview-container"
		className="xs:grid-cols-2 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
	>
		{previewImages.map((image, index) => (
			<div
				key={index}
				className="group relative cursor-pointer overflow-hidden"
			>
				<Image
					src={`/preview/${image.src}.jpg`}
					alt={`Preview ${index}`}
					width={0}
					height={0}
					sizes="100vw"
					className="h-auto w-full"
					priority
				/>
				<div className="absolute inset-x-0 bottom-0 h-0 bg-black/80 transition-all duration-300 ease-in group-hover:h-full">
					<div className="flex h-full items-center justify-center opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
						<h3 className="text-center text-xl font-bold text-white">
							{image.title}
						</h3>
					</div>
				</div>
			</div>
		))}
	</div>
);

export default PreviewGrid;
