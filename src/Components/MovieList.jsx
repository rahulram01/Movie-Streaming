// MovieList.js
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import GlobalApi from "../Services/GlobalApi";
import MovieCard from "./MovieCard";

function MovieList({ genreId }) {
  const elementRef = useRef(null);
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    if (genreId) {
      getMovieListByGenreId();
    }
  }, [genreId]);

  const slideRight = (element) => {
    element.scrollLeft += 600; // Adjust the scroll distance as needed
  };

  const slideLeft = (element) => {
    element.scrollLeft -= 600; // Adjust the scroll distance as needed
  };

  const getMovieListByGenreId = () => {
    GlobalApi.getMovieByGenreId(genreId).then((resp) => {
      setMovieList(resp.data.results);
    });
  };

  return (
    <div className="flex items-center overflow-hidden">
      <IoChevronBackOutline
        onClick={() => slideLeft(elementRef.current)}
        className="text-[40px] text-white bg-black p-2 z-10 cursor-pointer mb-[120px] rounded-full hidden md:block"
      />
      <div
        id="slider"
        ref={elementRef}
        className="w-full flex whitespace-nowrap mb-16 ml-[-20px] mr-[-20px]"
        style={{ overflowX: "auto", scrollbarWidth: "none" }}
      >
        <div className="flex">
          {movieList.map((item, index) => (
            <div
              key={index}
              className="inline-block m-2 md:m-1 cursor-pointer group" // Decrease the margin here
              style={{ flex: "0 0 auto", width: "480px" }} // Set the width of each frame
            >
              <MovieCard
                movie={item}
                genre_id={genreId}
                imageWidth={400}
                imageHeight={600}
              />{" "}
              {/* Pass the genre_id prop */}
            </div>
          ))}
        </div>
      </div>
      <IoChevronForwardOutline
        onClick={() => slideRight(elementRef.current)}
        className="text-[40px] text-white hidden md:block bg-black p-2 cursor-pointer z-10 mb-[120px] rounded-full"
      />
    </div>
  );
}

MovieList.propTypes = {
  genreId: PropTypes.number.isRequired,
};

export default MovieList;
