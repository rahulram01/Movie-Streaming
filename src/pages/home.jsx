import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../utils/themes";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import ProductionHouse from "../Components/ProductionHouse";
import GenereMovieList from "../Components/GenreMovieList";
import AnimeSlider from "../Components/AnimeSlider";
import SeriesSlider from "../Components/SeriesSlider";
import SeriesGenreList from "../Components/SeriesGenreList";
import FantasySlider from "../Components/FantasySlider";
import FictionGenreList from "../Components/FictionGenreList";
import CrimeGenreList from "../Components/CrimeGenreList";
import CrimeSlider from "../Components/CrimeSlider";
import Login from "../Components/Login";
import WatchMovie from "../Components/WatchMovie";
import Search from "../Components/Search";
import Dashboard from "../Components/Dashboard";
import AnimeGenreList from "../Components/SeriesGenreList";
import DisplayPodcasts from "../Components/DisplayPodcast";
import PodcastDetails from "../Components/PodcastDetails";
import AudioPlayer from "../Components/AudioPlayer";
import VideoPlayer from "../Components/VideoPlayer";
import BrandPage from "../Components/BrandPage";
// import Chatbot from "../Components/Chatbot";
function Home() {
  const { openplayer, type, episode, podid, currenttime, index } = useSelector(
    (state) => state.audioplayer
  );

  return (
    <Router>
      <ThemeProvider theme={darkTheme}>
        <div>
          {openplayer && type === "video" && (
            <VideoPlayer
              episode={episode}
              podid={podid}
              currenttime={currenttime}
              index={index}
            />
          )}
          {openplayer && type === "audio" && (
            <AudioPlayer
              episode={episode}
              podid={podid}
              currenttime={currenttime}
              index={index}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Header />
                  <Hero />
                  <ProductionHouse />
                  <GenereMovieList />
                </div>
              }
            />
            <Route
              path="/anime"
              element={
                <div>
                  <Header />
                  <AnimeSlider />
                  <AnimeGenreList />
                </div>
              }
            />
            <Route
              path="/series"
              element={
                <div>
                  <Header />
                  <SeriesSlider />
                  <SeriesGenreList />
                </div>
              }
            />
            <Route
              path="/fiction"
              element={
                <div>
                  <Header />
                  <FantasySlider />
                  <FictionGenreList />
                </div>
              }
            />
            <Route path="/production-house" component={ProductionHouse} />
            <Route
              path="/crime"
              element={
                <div>
                  <Header />
                  <CrimeSlider />
                  <CrimeGenreList />
                </div>
              }
            />
            <Route
              path="/subscription"
              element={
                <div>
                  <Header />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div>
                  <Login />
                </div>
              }
            />
            <Route
              path="/watch"
              element={
                <div>
                  <Header />
                  <WatchMovie />
                </div>
              }
            />
            <Route
              path="/pod"
              element={
                <div>
                  <Header />
                  <Dashboard />
                </div>
              }
            />
            <Route
              path="/search"
              element={
                <div>
                  <Search />
                </div>
              }
            />
            <Route path="/podcast/:id" exact element={<PodcastDetails />} />
            <Route
              path="/showpodcasts/:type"
              exact
              element={<DisplayPodcasts />}
            />
            <Route path="/brands/:brand" element={<BrandPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default Home;
