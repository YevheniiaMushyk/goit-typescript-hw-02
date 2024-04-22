import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { Image, Response } from "./App.types";

axios.defaults.baseURL = "https://api.unsplash.com/";
const ACCESS_KEY: string = "xULULFXeUk1fNLMzyCQC1Jr-qjAdE5ry3zzME2EcM_A";

const App = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	const [isLoadMore, setIsLoadMore] = useState<boolean>(false);
	const [imageGallery, setImageGallery] = useState<Image[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [queryPage, setQueryPage] = useState<number>(1);
	const [modalIsOpen, setIsOpen] = useState<boolean>(false);
	const [selectedImage, setSelectedImage] = useState<Image | null>(null);
	const [isScrollToTop, setScrollToTop] = useState<boolean>(false);

	useEffect(() => {
		if (!searchQuery) return;
		async function fetchImages() {
			try {
				setIsError(false);
				setIsLoading(true);
				setIsLoadMore(false);

				const { data }: AxiosResponse<Response> = await axios.get("search/photos", {
					params: { client_id: ACCESS_KEY, query: searchQuery, page: queryPage, per_page: "28", orientation: "squarish" },
				});
				console.log(data);

				setImageGallery((prevGallery) => [...prevGallery, ...data.results]);

				if (data.total <= 0) {
					setIsError(true);
					setErrorMessage("Sorry, there are no images matching your search query. Please try again!");
				}
				if (queryPage <= data.total_pages) {
					setIsLoadMore(true);
				}
			} catch (err) {
				const error = err as Error;
				setIsError(true);
				setErrorMessage(error.message);
			} finally {
				setIsLoading(false);
			}
		}

		fetchImages();
	}, [searchQuery, queryPage]);

	const onSetSearchQuery = (query: string) => {
		setImageGallery([]);
		setQueryPage(1);
		setSearchQuery(query);
	};

	const handleLoadMore = () => {
		setQueryPage((prevPage) => prevPage + 1);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setScrollToTop(true);
			} else {
				setScrollToTop(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	function openModal(image: Image) {
		setIsOpen(true);
		setSelectedImage(image);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function afterOpenModal() {
		document.getElementById("modal-content")?.focus();
	}

	return (
		<>
			<SearchBar onSetSearchQuery={onSetSearchQuery} />
			{isLoading && <Loader />}
			{!isError ? <ImageGallery imageGallery={imageGallery} openModal={openModal} /> : <ErrorMessage message={errorMessage} />}
			{isLoadMore && <LoadMoreBtn handleLoadMore={handleLoadMore} />}
			{isScrollToTop && <ScrollToTop scrollToTop={scrollToTop} />}
			{modalIsOpen && <ImageModal image={selectedImage} modalIsOpen={modalIsOpen} closeModal={closeModal} afterOpenModal={afterOpenModal} />}
		</>
	);
};

export default App;
