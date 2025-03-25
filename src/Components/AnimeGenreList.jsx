import React, { useEffect, useRef, useState } from "react";
// import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import GlobalApi from "../Services/GlobalApi";
import MovieCard from "./MovieCard";

function AnimeGenreList() {
  const elementRef = useRef(null);
  const [animeList, setAnimeList] = useState([]);
  const titles = [
    "Popular",
    "Most Watched",
    "Releases",
    "High Rated",
    "Adventure",
  ]; // Add as many titles as needed

  useEffect(() => {
    getAnimeList();
  }, []);

  const getAnimeList = () => {
    GlobalApi.getMovieByGenreId(53) // Assuming 16 is the genre ID for Animation
      .then((resp) => {
        setAnimeList(resp.data.results);
      })
      .catch((error) => {
        console.error("Error fetching anime list:", error);
      });
  };

  return (
    <div className="mt-24 p-5 px-10 md:px-20">
      <div
        id="slider"
        ref={elementRef}
        className="w-full flex flex-wrap mb-16 ml-[-20px] mr-[-20px]"
        style={{ scrollbarWidth: "none" }}
      >
        {animeList.map((anime, index) => (
          <React.Fragment key={index}>
            {index % 4 === 0 && ( // Check if index is a multiple of 4 (start of a new row)
              <h2 className="text-white text-[20px] font-bold w-full mb-4">
                {titles[index / 4]} {/* Assign title based on index */}
              </h2>
            )}
            <div
              className="inline-block m-2 md:m-1 cursor-pointer group" // Decrease the margin here
              style={{ flex: "0 0 auto", width: "calc(25% - 20px)" }} // Set the width of each frame (25% for 4 items per row)
            >
              <MovieCard movie={anime} imageWidth={400} imageHeight={600} />{" "}
              <br />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default AnimeGenreList;
