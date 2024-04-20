import css from "./ImageCard.module.css";
import ImageCardProps from "./ImageCard.types";

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
	return (
		<div className={css.imageContainer}>
			<img className={css.image} src={image.urls.small} alt={image.alt_description} onClick={() => openModal(image)} />
		</div>
	);
};

export default ImageCard;
