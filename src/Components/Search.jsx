import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { searchMovies } from "../Services/GlobalApi";
import MovieCard from "./MovieCard";
import { HiChevronLeft } from "react-icons/hi";
import { MdKeyboardVoice } from "react-icons/md";

function Search() {
  const [searchedMovies, setSearchedMovies] = useState(null);
  const [loader, setLoader] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const recognition = useRef(null); // Reference to SpeechRecognition instance

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoader(true);
        const response = await searchMovies(query);
        setSearchedMovies(response.data.results);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoader(false);
      }
    };

    if (query.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchedMovies(null);
    }
  }, [query]);

  useEffect(() => {
    if (recognition.current) {
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
      };
    }
  }, []);

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const startVoiceRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = false;
    recognition.current.interimResults = false;
    recognition.current.lang = "en-US";
    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript); // Set the query with the recognized transcript
      handleSearch(); // Automatically trigger the search
    };
    recognition.current.start();
  };

  return (
    <section className="bg-black h-screen flex flex-col justify-start items-center">
      <div className="fixed top-0 left-0 w-full bg-black z-10">
        <div className="flex justify-center items-center mt-5">
          <Link to="/home" className="absolute left-0 m-5">
            <HiChevronLeft className="text-4xl text-white" />
          </Link>
          <input
            type="text"
            className="bg-gray-800 text-white rounded-full py-2 px-4 pl-12 focus:outline-none focus:bg-gray-900"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-green text-white rounded-full py-2 px-4 ml-2 focus:outline-none focus:bg-gray-900"
            onClick={startVoiceRecognition}
          >
            <MdKeyboardVoice className="text-white" />
          </button>
        </div>
      </div>
      <div className="mt-20 w-full bg-black p-10">
        <motion.div
          layout
          className="flex flex-wrap justify-evenly md:justify-around"
        >
          <AnimatePresence>
            {searchedMovies !== null &&
              (loader ? (
                <span className="loader m-10"></span>
              ) : (
                <>
                  {searchedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Search;
