import { FC } from "react";
import Modal from "react-modal";
import ImageModalProps from "./ImageModal.type";
import css from ".//ImageModal.module.css";
Modal.setAppElement("#root");

const ImageModal: FC<ImageModalProps> = ({ image, modalIsOpen, closeModal }) => {
	if (!image) {
		return;
	}
	const dateString = image.created_at;
	const date = dateString ? new Date(dateString) : null;
	const formattedDate = date ? date.toLocaleDateString() : null;
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			shouldCloseOnEsc={true}
			// onAfterOpen={afterOpenModal}
			shouldFocusAfterRender={true}
			style={{
				overlay: {
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: "rgba(99, 136, 137, 0.95)",
				},
				content: {
					position: "absolute",
					top: "50%",
					left: "50%",
					right: "auto",
					bottom: "auto",
					marginRight: "-50%",
					transform: "translate(-50%, -50%)",

					// border: "1px solid #f9efdb",
					background: "rgba(249, 239, 219, 0.85)",
					overflow: "hidden",
					WebkitOverflowScrolling: "touch",
					borderRadius: "20px",
					outline: "none",
				},
			}}
		>
			<div tabIndex={-1} id="modal-content" className={css.modalContainer}>
				<img className={css.modalImg} src={image.urls.regular} alt={image.alt_description || "No Description"} />
				<ul className={css.modalList}>
					<li className={css.modalItem}>
						<p className={css.modalTitle}>Description</p>
						<p className={css.modalContent}>{image.alt_description}</p>
					</li>

					<li className={css.modalItem}>
						<p className={css.modalTitle}>Author</p>
						<p className={css.modalContent}>{image.user.name}</p>
					</li>
					<li className={css.modalItem}>
						<p className={css.modalTitle}>Date</p>
						<p className={css.modalContent}>{formattedDate}</p>
					</li>
					<li className={css.modalItem}>
						<p className={css.modalTitle}>Likes</p>
						<p className={css.modalContent}>{image.likes}</p>
					</li>
				</ul>
			</div>
		</Modal>
	);
};

export default ImageModal;
