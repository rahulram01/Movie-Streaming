import * as React from "react";
import Avatar from "@mui/material/Avatar";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { favoritePodcast } from "../Services/GlobalApi";
import { Link } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PropTypes from "prop-types";
const PlayIcon = styled.div`
  padding: 10px;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: #9000ff !important;
  color: white !important;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: absolute !important;
  top: 45%;
  right: 10%;
  display: none;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 0 16px 4px #9000ff50 !important;
`;

const Card = styled(Link)`
  position: relative;
  text-decoration: none;
  background-color: ${({ theme }) => theme.card};
  max-width: 220px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.1);
  &:hover {
    cursor: pointer;
    transform: translateY(-8px);
    transition: all 0.4s ease-in-out;
    box-shadow: 0 0 18px 0 rgba(0, 0, 0, 0.3);
    filter: brightness(1.3);
  }
  &:hover ${PlayIcon} {
    display: flex;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  position: relative;
`;
const Title = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_primary};
`;

const Description = styled.div`
  overflow: hidden;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 12px;
`;

const CardImage = styled.img`
  object-fit: cover;
  width: 220px;
  height: 140px;
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  &:hover {
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  }
`;
const placeholderImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMkQTozcYtldrxhBjuJginRl8d8rGsnZ5g4m_O9w_jfA&s";

const CardInformation = styled.div`
  display: flex;
  align-items: flex-end;
  font-weight: 450;
  padding: 14px 0px 0px 0px;
  width: 100%;
`;
const MainInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  gap: 4px;
`;
const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
`;
const CreatorName = styled.div`
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.text_secondary};
`;
const TimePosted = styled.div`
  color: ${({ theme }) => theme.text_secondary};
`;

const Views = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.text_secondary};
  width: max-content;
`;
const Favorite = styled(IconButton)`
  color: white;
  top: 8px;
  right: 6px;
  padding: 6px !important;
  border-radius: 50%;
  z-index: 100;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.primary + "95"} !important;
  color: white !important;
  position: absolute !important;
  backdrop-filter: blur(4px);
  box-shadow: 0 0 16px 6px #222423 !important;
`;
export const PodcastCard = ({ podcast, user }) => {
  const [favourite, setFavourite] = useState(false);

  const token = localStorage.getItem("podstreamtoken");

  const favoritpodcast = async () => {
    await favoritePodcast(podcast._id, token)
      .then((res) => {
        if (res.status === 200) {
          setFavourite(!favourite);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    //favorites is an array of objects in which each object has a podcast id match it to the current podcast id
    if (user?.favorites?.find((fav) => fav._id === podcast._id)) {
      setFavourite(true);
    }
  }, [user]);

  return (
    <Card to={`/podcast/${podcast._id}`}>
      <div>
        <Top>
          <Favorite onClick={favoritpodcast}>
            {favourite ? (
              <FavoriteIcon
                style={{ color: "#E30022", width: "16px", height: "16px" }}
              ></FavoriteIcon>
            ) : (
              <FavoriteIcon
                style={{ width: "16px", height: "16px" }}
              ></FavoriteIcon>
            )}
          </Favorite>
          <CardImage
            src={podcast.thumbnail || placeholderImage}
            alt={podcast.name}
            onError={(e) => {
              e.target.src = placeholderImage; // Set placeholder image if thumbnail fails to load
            }}
          />
        </Top>
        <CardInformation>
          <MainInfo>
            <Title>{podcast.name}</Title>
            <Description>{podcast.desc}</Description>
            <CreatorInfo>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Avatar
                  src={podcast.creator.img}
                  style={{ width: "26px", height: "26px" }}
                >
                  {podcast.creator.name?.charAt(0).toUpperCase()}
                </Avatar>
                <CreatorName>{podcast.creator.name}</CreatorName>
              </div>
              <TimePosted>Posted: {podcast.timePosted}</TimePosted>
              <Views>• {podcast.views} Views</Views>
            </CreatorInfo>
          </MainInfo>
        </CardInformation>
      </div>
      <PlayIcon>
        {podcast?.type === "video" ? (
          <PlayArrowIcon style={{ width: "28px", height: "28px" }} />
        ) : (
          <HeadphonesIcon style={{ width: "28px", height: "28px" }} />
        )}
      </PlayIcon>
    </Card>
  );
};
PodcastCard.propTypes = {
  podcast: PropTypes.object.isRequired,
  user: PropTypes.object,
};
