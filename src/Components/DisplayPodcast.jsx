import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getPodcastByCategory,
  getMostPopularPodcast,
} from "../Services/GlobalApi.jsx";
import styled from "styled-components";
import { PodcastCard } from "./PodcastCard.jsx"; // Import PodcastCard component
import { useDispatch } from "react-redux";
import { openSnackbar } from "../stores/snackbarSlice.jsx";
import { CircularProgress } from "@mui/material";

const DisplayMain = styled.div`
  display: flex;
  padding: 30px 30px;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
`;
const Topic = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  font-weight: 540;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Podcasts = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  gap: 10px;
  padding: 30px 0px;
`;
const Container = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 6px;
  min-height: 400px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const DisplayNo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
`;

const DisplayPodcasts = () => {
  const { type } = useParams();
  const [podcasts, setPodcasts] = useState([]);
  const [string, setString] = useState("");
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(false);
  const mostPopular = async () => {
    await getMostPopularPodcast()
      .then((res) => {
        // Check if there are any podcasts returned
        if (res.data && res.data.length > 0) {
          // Set the first 8 podcasts in the array
          setPodcasts(res.data.slice(0, 8));
        } else {
          // If no podcasts are returned, set an empty array
          setPodcasts([]);
        }
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const getCategory = async () => {
    await getPodcastByCategory(type)
      .then((res) => {
        setPodcasts(res.data);
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const getallpodcasts = async () => {
    if (type === "mostpopular") {
      setLoading(true);
      let arr = type.split("");
      arr[0] = arr[0].toUpperCase();
      arr.splice(3, 0, " ");
      setString(arr.join(""));
      console.log(string);
      await mostPopular();
      setLoading(false);
    } else {
      setLoading(true);
      let arr = type.split("");
      arr[0] = arr[0].toUpperCase();
      setString(arr);
      await getCategory();
      setLoading(false);
    }
  };

  useEffect(() => {
    getallpodcasts();
  }, []);
  return (
    <DisplayMain>
      <Container>
        <Topic>{string}</Topic>
        {Loading ? (
          <Loader>
            <CircularProgress />
          </Loader>
        ) : (
          <Podcasts>
            {podcasts.length === 0 && <DisplayNo>No Podcasts</DisplayNo>}
            {podcasts.map((podcast) => (
              <PodcastCard key={podcast._id} podcast={podcast} /> // Render PodcastCard component
            ))}
          </Podcasts>
        )}
      </Container>
    </DisplayMain>
  );
};

export default DisplayPodcasts;
