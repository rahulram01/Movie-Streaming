// WatchBackground.js
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_Options } from "../utils/constants";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const WatchBackground = () => {
  const location = useLocation();
  const { movie } = location.state;

  const [trailerId, setTrailerId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Fetch movie videos and set trailerId
    getMovieVideos(movie.id);
  }, [movie.id]);

  const getMovieVideos = async (movieId) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_Options
      );
      const json = await data.json();
      const filterData = json?.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData[0];
      setTrailerId(trailer?.key);
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  };

  const handlePlayButtonClick = () => {
    setIsPlaying(true);
  };

  const handlePauseButtonClick = () => {
    setIsPlaying(false);
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="flex justify-center items-center w-full overflow-hidden relative">
        <div className="flex-shrink-0 flex justify-center items-center">
          <div className="relative">
            {movie && (
              <img
                src={`${IMAGE_BASE_URL}${movie?.backdrop_path}`}
                alt={`Backdrop`}
                className="w-screen h-screen object-cover"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              {trailerId && isPlaying && (
                <iframe
                  className="w-screen h-screen aspect-video"
                  src={`https://www.youtube.com/embed/${trailerId}?&autoplay=1&mute=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
              <h2 className="text-xl font-semibold">
                Watch only on NOVA XTREME
              </h2>
              {movie && (
                <>
                  <h2 className="text-2xl font-bold">
                    {movie?.original_title}
                  </h2>
                  <div className="flex gap-3 mt-2">
                    <button
                      className="px-4 py-2 bg-violet-950 text-white rounded hover:bg-indigo-950"
                      onClick={handlePlayButtonClick}
                    >
                      Play
                    </button>
                    <button
                      className="px-4 py-2 bg-transparent border border-white text-white rounded hover:bg-gray-700"
                      onClick={handlePauseButtonClick}
                    >
                      {isPlaying ? "END" : "START"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WatchBackground.propTypes = {
  movieId: PropTypes.number.isRequired,
  original_title: PropTypes.string.isRequired,
};

export default WatchBackground;
