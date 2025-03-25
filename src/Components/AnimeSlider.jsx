import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import GlobalApi from "../Services/GlobalApi";
import GenreList from "../Constant/GenreList";
import VideoBackground from "./VideoBackground";
import { useNavigate } from "react-router-dom";

function AnimeSlider() {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
  const [animeList, setAnimeList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    getAnimeMovies();
  }, []);

  const getAnimeMovies = () => {
    const animationGenreId = getAnimationGenreId();
    if (animationGenreId) {
      GlobalApi.getMovieByGenreId(animationGenreId)
        .then((resp) => {
          const result = resp.data.results;
          setAnimeList(result);
        })
        .catch((error) => {
          console.error("Error fetching anime movies:", error);
        });
    }
  };

  const getAnimationGenreId = () => {
    const animationGenre = GenreList.genere.find(
      (genre) => genre.name === "Thriller"
    );
    return animationGenre ? animationGenre.id : null;
  };

  const handleSlideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === animeList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleSlideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? animeList.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === animeList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePlayButtonClick = () => {
    navigate("/watch", { state: { movie: animeList[currentIndex] } }); // Navigate to the /watch page with movie data
  };

  return (
    <div className="relative overflow-hidden">
      <HiChevronLeft
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer z-10"
        onClick={handleSlideLeft}
      />
      <HiChevronRight
        className="hidden md:block text-white text-[30px] absolute mx-8 mt-[150px] cursor-pointer right-0 z-10"
        onClick={handleSlideRight}
      />

      <div className="flex justify-center items-center w-full overflow-hidden">
        {animeList.map((anime, index) => (
          <div
            key={index}
            className={`flex-shrink-0 flex justify-center items-center ${
              index === currentIndex ? "" : "hidden"
            }`}
            style={{ width: "100%" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative">
              <img
                src={`${IMAGE_BASE_URL}${anime.backdrop_path}`}
                alt={`Slide ${index + 1}`}
                className="w-[960vh] h-[85vh] object-cover"
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: isHovered ? 1 : 0 }}
              >
                <VideoBackground
                  movieId={anime.id}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                <h2 className="text-xl font-semibold">
                  Watch only on NOVA XTREME
                </h2>
                <h2 className="text-2xl font-bold">{anime.original_title}</h2>
                <div className="flex gap-3 mt-2">
                  <button
                    className="px-4 py-2 bg-violet-950 text-white rounded hover:bg-blue-700"
                    onClick={handlePlayButtonClick} // Update onClick handler
                  >
                    PLAY
                  </button>
                  <button
                    className="px-4 py-2 bg-transparent border border-white text-white rounded hover:bg-gray-700"
                    onClick={handleNext}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnimeSlider;
