export interface Image {
	id: string;
	urls: {
		regular: string;
	};
	alt_description: string;
}

export interface Response {
	total: number;
	total_pages: number;
	results: Image[];
}

export interface ImageGalleryProps {
	image: Image | null;
	modalIsOpen: boolean;
	closeModal: () => void;
	afterOpenModal: () => void;
}
