// import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

import Slider from "react-slick";
// import { withRouter } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import useSingleRow from "../hooks/useSingleRow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SingleRow.css";
import MovieCards from "./MovieCards";

const SinglePage = ({ title, fetchUrl, watching }) => {
  const { movies } = useSingleRow(fetchUrl);
  return (
    <>
      {movies.length > 0 ? (
        <article className="singleRow">
          <h2 className="singleRow__title">{title}</h2>
          <Slider className="singleRow__slider">
            {movies.map((movie) => (
              <MovieCards
                id={movie.id}
                key={movie.id}
                poster={movie.backdrop_path}
                title={movie.title}
                watching={watching}
              />
            ))}
          </Slider>
        </article>
      ) : (
        <Skeleton animation="wave" variant="rect" width="100%" height={200} />
      )}
    </>
  );
};

// Define prop types
SinglePage.propTypes = {
  title: PropTypes.string.isRequired, // Title should be a string and required
  fetchUrl: PropTypes.string.isRequired, // fetchUrl should be a string and required
  watching: PropTypes.bool.isRequired, // watching should be a boolean and required
};

export default SinglePage;
