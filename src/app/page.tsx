import path from 'path';
import fs from 'fs';

import MainPictures from '@/components/MainPictures';
import Header from '@/components/Header';
import PreviewGrid from '@/components/PreviewGrid';
import AtelierContent from '@/components/AtelierContent';

const MAIN_PICTURES_DIRECTORY = 'main';
const MAIN_PICTURES = path.join(
	process.cwd(),
	'public',
	MAIN_PICTURES_DIRECTORY
);

const mainPictures = fs.readdirSync(MAIN_PICTURES);

const Home = () => (
	<>
		<Header />
		<MainPictures posts={mainPictures} />

		<section id="preview-section" className="container mx-auto my-16 px-6">
			<h1 className="mb-6 border-b border-gray-300 text-center text-lg tracking-wide text-gray-500">
				PROJEKTY
			</h1>
			<PreviewGrid />
		</section>

		<section id="atelier-section" className="container mx-auto my-16 px-6">
			<h1 className="mb-6 border-b border-gray-300 text-center text-lg tracking-wide text-gray-500">
				ATELIÉR
			</h1>
			<AtelierContent />
		</section>

		<section
			className="container mx-auto my-16 px-6"
			style={{ height: '2000px' }}
		>
			<h1 className="mb-6 border-b border-gray-300 text-center text-lg tracking-wide text-gray-500">
				OCENĚNÍ
			</h1>
		</section>
	</>
);

export default Home;
