import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { API_Options } from "../utils/constants";

const VideoBackground = ({ movieId }) => {
  const [trailerId, setTrailerId] = useState(null);

  const getMovieVideos = async () => {
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

  useEffect(() => {
    getMovieVideos();
  }, [movieId]);

  return (
    <div className="w-full">
      {trailerId && (
        <iframe
          className="w-screen aspect-video"
          src={`https://www.youtube.com/embed/${trailerId}?&autoplay=1&mute=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  );
};

VideoBackground.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default VideoBackground;
