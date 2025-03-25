import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getMostPopularPodcast,
  getPodcastByCategory,
} from "../Services/GlobalApi";
import { PodcastCard } from "./PodcastCard";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const DashboardMain = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #15171e;
  position: relative;
  top: 120px;
  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const FilterContainer = styled.div`
  background-color: #1c1e27;
  border-radius: 10px;
  padding: 20px 30px;
  margin-bottom: 20px;
`;

const Topic = styled.div`
  color: #f2f3f4;
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Span = styled.span`
  color: #b1b2b3;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: #be1adb;
    transition: 0.2s ease-in-out;
  }
`;

const Podcasts = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(900px, 1fr)
  ); /* Increased min-width to 300px */
  gap: 20px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(
      3,
      1fr
    ); /* Adjusted to show three cards per row */
  }
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Dashboard = () => {
  const [mostPopular, setMostPopular] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [news, setNews] = useState([]);
  const [sports, setSports] = useState([]);
  const [crime, setCrime] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const popularPodcasts = await getMostPopularPodcast();
        setMostPopular(popularPodcasts.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching most popular podcasts:", error);
        setLoading(false);
      }
    };
    fetchData();

    const fetchPodcastsByCategory = async (category, setData) => {
      setLoading(true);
      try {
        const podcasts = await getPodcastByCategory(category);
        setData(podcasts.data);
      } catch (error) {
        console.error(`Error fetching ${category} podcasts:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastsByCategory("comedy", setComedy);
    fetchPodcastsByCategory("news", setNews);
    fetchPodcastsByCategory("sports", setSports);
    fetchPodcastsByCategory("crime", setCrime);
  }, []);

  return (
    <DashboardMain>
      {loading ? (
        <Loader>
          <CircularProgress />
        </Loader>
      ) : (
        <>
          <FilterContainer>
            <Topic>
              Most Popular
              <Link
                to={`/showpodcasts/mostpopular`}
                style={{ textDecoration: "none" }}
              >
                <Span>Show All</Span>
              </Link>
            </Topic>
            <Podcasts>
              {mostPopular.map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Topic>
              <Link
                to={`/showpodcasts/comedy`}
                style={{ textDecoration: "none", color: "#F2F3F4" }}
              >
                Comedy
              </Link>
              <Span>
                <Link
                  to={`/showpodcasts/comedy`}
                  style={{ textDecoration: "none" }}
                >
                  Show All
                </Link>
              </Span>
            </Topic>
            <Podcasts>
              {comedy.map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Topic>
              <Link
                to={`/showpodcasts/news`}
                style={{ textDecoration: "none", color: "#F2F3F4" }}
              >
                News
              </Link>
              <Span>
                <Link
                  to={`/showpodcasts/news`}
                  style={{ textDecoration: "none" }}
                >
                  Show All
                </Link>
              </Span>
            </Topic>
            <Podcasts>
              {news.map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Topic>
              <Link
                to={`/showpodcasts/crime`}
                style={{ textDecoration: "none", color: "#F2F3F4" }}
              >
                Crime
              </Link>
              <Span>
                <Link
                  to={`/showpodcasts/crime`}
                  style={{ textDecoration: "none" }}
                >
                  Show All
                </Link>
              </Span>
            </Topic>
            <Podcasts>
              {crime.map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} />
              ))}
            </Podcasts>
          </FilterContainer>
          <FilterContainer>
            <Topic>
              <Link
                to={`/showpodcasts/sports`}
                style={{ textDecoration: "none", color: "#F2F3F4" }}
              >
                <h1>Sports</h1>
              </Link>
              <Span>
                <Link
                  to={`/showpodcasts/sports`}
                  style={{ textDecoration: "none" }}
                >
                  Show All
                </Link>
              </Span>
            </Topic>
            <Podcasts>
              {sports.map((podcast) => (
                <PodcastCard key={podcast._id} podcast={podcast} />
              ))}
            </Podcasts>
          </FilterContainer>
        </>
      )}
    </DashboardMain>
  );
};

export default Dashboard;
