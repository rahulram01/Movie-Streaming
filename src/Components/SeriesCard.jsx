// SeriesCard.js
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function SeriesCard({ movie }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();

  const handleMovieClick = () => {
    // Navigate to the movie details page
    navigate("/watch", { state: { movie } });
  };

  return (
    <div className="inline-block m-2 md:m-3 cursor-pointer group">
      {/* Wrap the image with a clickable div */}
      <div onClick={handleMovieClick}>
        <img
          src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-[230px] md:w-[340px] object-cover rounded-2xl group-hover:border-[5px] border-gray-400 p-2 transition-all duration-300 ease-in-out"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col">
        {" "}
        {/* Flex container for text */}
        <h2 className="text-gray-400 mt-2 text-[12px] md:text-[17px] font-bold">
          WATCH MOVIE
        </h2>
        <div className="flex justify-between items-center">
          {" "}
          {/* Flex container for title and "Free" */}
          <h2 className="text-white mt-1 transition-all md:text-[22px] group-hover:font-bold">
            {movie.original_title}
          </h2>
          <div className="block bg-[#416D19] w-[6vh] rounded-lg p-1">
            <h2 className="text-white text-xs md:text-sm">
              {/* Style Free here */}
              FREE
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

SeriesCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    backdrop_path: PropTypes.string.isRequired,
    original_title: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default SeriesCard;
