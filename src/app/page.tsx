import path from 'path';
import fs from 'fs';

import MainPictures from '@/components/MainPictures';
import Header from '@/components/Header';

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

		<section
			className="container mx-auto my-16 px-6"
			style={{ height: '3000px' }}
		>
			<h1 className="border-b border-gray-300 text-center text-lg tracking-wide text-gray-500">
				PROJEKTY
			</h1>
		</section>
	</>
);

export default Home;
