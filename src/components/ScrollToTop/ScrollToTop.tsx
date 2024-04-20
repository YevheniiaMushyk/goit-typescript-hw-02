import css from "./ScrollToTop.module.css";
import { FaArrowUp } from "react-icons/fa6";
import ScrollToTopProps from "./ScrollToTop.types";

const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollToTop }) => {
	return (
		<button className={css.scrollToTop} onClick={scrollToTop}>
			<FaArrowUp className={css.arrow} />
		</button>
	);
};

export default ScrollToTop;
