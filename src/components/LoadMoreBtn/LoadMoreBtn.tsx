import css from "../LoadMoreBtn/LoadMoreBtn.module.css";
import LoadMoreBtnProps from "./LoadMoreBtn.types";

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleLoadMore }) => {
	return (
		<button className={css.loadMoreBtn} type="button" onClick={handleLoadMore}>
			Load more
		</button>
	);
};

export default LoadMoreBtn;
