import MainPictures from '@/components/MainPictures';
import Header from '@/components/Header';
import PreviewGrid from '@/components/PreviewGrid';
import AtelierContent from '@/components/AtelierContent';
import RewardsContent from '@/components/RewardsContent';

const Home = () => (
	<>
		<Header />
		<MainPictures />

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
			<RewardsContent />
		</section>
	</>
);

export default Home;
