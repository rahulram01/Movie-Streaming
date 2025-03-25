import { useEffect } from "react";
import PropTypes from "prop-types";
import SinglePage from "./SinglePage";
import requests from "../Services/request";
import "./BrandPage.css";

const BrandPage = () => {
  // const { match = {} } = props;
  const brand = "marvel"; // Hardcoded value for testing

  // Add null check using the optional chaining operator '?'

  // Check if 'brand' is undefined or null before further processing
  console.log(brand);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="brandPage">
      <div className="brandPage__background">
        <img alt="" src={`/images/brands/marvel-bg.jpg`} />
      </div>
      <div className="brandPage__image">
        {brand !== "pixar" ? (
          <img src={`/images/brands/${brand}.png`} alt="" />
        ) : null}
      </div>
      <div className="brandPage__movies movieRows__container">
        {brand === "marvel" ? (
          <>
            <SinglePage
              title="Marvel Universe"
              fetchUrl={`list/8920?api_key=d84a71e64320fa4ab9be0d5282da990b&language=en-US`}
            />
            <SinglePage
              title="Marvel Universe: Phase One"
              fetchUrl={requests.fetchMarvelPhaseOne}
            />
            <SinglePage
              title="Marvel Universe: Phase Two"
              fetchUrl={requests.fetchMarvelPhaseTwo}
            />
            <SinglePage
              title="Marvel Universe: Phase Three"
              fetchUrl={requests.fetchMarvelPhaseThree}
            />
          </>
        ) : null}
        {brand === "pixar" ? (
          <>
            <SinglePage
              title="Pixar Movies"
              fetchUrl={requests.fetchPixar}
            ></SinglePage>
            <SinglePage
              title="Toy Story Collection"
              fetchUrl={requests.fetchToyStory}
            ></SinglePage>
            <SinglePage
              title="Cars Collection"
              fetchUrl={requests.fetchCars}
            ></SinglePage>
            <SinglePage
              title="Unexpected Heroes"
              fetchUrl={requests.fetchUnexpectedHeroes}
            ></SinglePage>
          </>
        ) : null}
        {brand === "star-wars" ? (
          <>
            <SinglePage
              title="Star Wars Collection"
              fetchUrl={requests.fetchStarWars}
            ></SinglePage>
            <SinglePage
              title="Star Wars Lego"
              fetchUrl={requests.fetchStarWarsLego}
            ></SinglePage>
          </>
        ) : null}
        {brand === "disney" ? (
          <>
            <SinglePage
              title="Disney Originals"
              fetchUrl={requests.fetchDisney}
            ></SinglePage>
            <SinglePage
              title="Classics"
              fetchUrl={requests.fetchDisneyClassics}
            ></SinglePage>
            <SinglePage
              title="Series"
              fetchUrl={requests.fetchDisneySeries}
            ></SinglePage>
          </>
        ) : null}
        {brand === "national-geographic" ? (
          <>
            <SinglePage
              title="Movies"
              fetchUrl={requests.fetchNationalMovies}
            ></SinglePage>
          </>
        ) : null}
      </div>
    </main>
  );
};

BrandPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      brand: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BrandPage;
