import { useState } from "react";
import { IoChevronForwardSharp } from "react-icons/io5";
import GenreList from "../Constant/GenreList";
import MovieList from "./MovieList";
// import VideoPlayer from "./VideoPlayer";

function GenereMovieList() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  return (
    <div className="mt-24 p-5 px-10 md:px-20 ">
      {GenreList.genere.map(
        (item, index) =>
          index <= 20 && (
            <div key={item.id}>
              <h2 className="text-white text-[20px] font-bold ">
                {item.name}
                <span className="font-normal text-[16px] cursor-pointer text-gray-400 float-right flex">
                  VIEW ALL
                  <IoChevronForwardSharp className="text-white ml-1" />
                </span>
              </h2>
              <MovieList genreId={item.id} onMovieClick={handleMovieClick} />
            </div>
          )
      )}
      {selectedMovieId && <VideoPlayer movieId={selectedMovieId} />}
    </div>
  );
}

export default GenereMovieList;
