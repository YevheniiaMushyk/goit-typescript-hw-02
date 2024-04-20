import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import ImageGalleryProps from "./ImageGallery.types";

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageGallery, openModal }) => {
	return (
		<ul className={css.galleryList}>
			{imageGallery.map((image, index) => {
				return (
					<li className={css.galleryItem} key={`${image.id}_${index}`}>
						<ImageCard image={image} openModal={openModal} />
					</li>
				);
			})}
		</ul>
	);
};

export default ImageGallery;
