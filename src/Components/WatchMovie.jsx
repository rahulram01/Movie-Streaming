import { useParams } from "react-router-dom";
import WatchBackground from "./WatchBackground";

const WatchMovie = () => {
  const { movieId } = useParams(); // Extract movieId from URL parameters

  return (
    <div className="overflow-x-hidden overflow-y-hidden flex justify-center items-center">
      <div className="relative">
        <WatchBackground movieId={parseInt(movieId)} />
        {/* Add any additional components or elements as needed */}
      </div>
    </div>
  );
};

export default WatchMovie;
