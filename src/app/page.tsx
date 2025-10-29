import path from 'path';
import fs from 'fs';

import MainPictures from '@/components/MainPictures';

const POST_FOLDER_NAME = 'main';
const POSTS_DIRECTORY = path.join(process.cwd(), 'public', POST_FOLDER_NAME);

const getPostLength = (): number => fs.readdirSync(POSTS_DIRECTORY).length;

const Home = () => (
	<>
		<header className="fixed z-10 w-full bg-white">
			<div className="container mx-auto flex justify-between py-2">
				<div>PH6</div>
				<nav>
					<ol className="flex flex-row gap-2 uppercase">
						<li>Projekty</li>
						<li>Atelier</li>
						<li>Kontakt</li>
					</ol>
				</nav>
			</div>
		</header>
		<MainPictures />
	</>
);

export default Home;
