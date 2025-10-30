import path from 'path';
import fs from 'fs';

import MainPictures from '@/components/MainPictures';
import Header from '@/components/Header';

const POST_FOLDER_NAME = 'main';
const POSTS_DIRECTORY = path.join(process.cwd(), 'public', POST_FOLDER_NAME);

const posts = fs.readdirSync(POSTS_DIRECTORY);

const Home = () => (
	<>
		<Header />
		<MainPictures posts={posts} />
		<div style={{ height: '3000px' }} />
	</>
);

export default Home;
