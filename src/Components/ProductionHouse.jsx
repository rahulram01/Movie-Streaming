import { Link } from "react-router-dom";
import disney from "./../assets/Images/disney.png";
import marvel from "./../assets/Images/marvel.png";
import nationalG from "./../assets/Images/nationalG.png";
import pixar from "./../assets/Images/pixar.png";
import starwar from "./../assets/Images/starwar.png";

import starwarV from "./../assets/Videos/star-wars.mp4";
import disneyV from "./../assets/Videos/disney-opening.mp4";
import marvelV from "./../assets/Videos/marvel.mp4";
import nationalGeographicV from "./../assets/Videos/national-geographic.mp4";
import pixarV from "./../assets/Videos/pixar-opening.mp4";
function ProductionHouse() {
  const productionHouseList = [
    {
      id: 1,
      image: disney,
      video: disneyV,
      brand: "disney",
    },
    {
      id: 2,
      image: pixar,
      video: pixarV,
      brand: "pixar",
    },
    {
      id: 3,
      image: marvel,
      video: marvelV,
      brand: "marvel",
    },
    {
      id: 4,
      image: starwar,
      video: starwarV,
      brand: "star-wars",
    },
    {
      id: 5,
      image: nationalG,
      video: nationalGeographicV,
      brand: "national-geographic",
    },
  ];

  return (
    <div className="flex gap-2 md:gap-5 p-2 px-5 md:px-16 ">
      {productionHouseList.map((item) => (
        <Link to={`/brands/${item.brand}`} key={item.id}>
          <div
            className="border-[2px] border-gray-600
              rounded-lg hover:scale-110 transition-all duration-300
              ease-in-out cursor-pointer relative shadow-xl 
              shadow-gray-800"
          >
            <video
              src={item.video}
              autoPlay
              loop
              playsInline
              muted
              className="absolute z-0 top-0 rounded-md 
              opacity-0 hover:opacity-50"
            />
            <img
              src={item.image}
              className="w-full z-[1] opacity-100"
              alt={`Production House ${item.id}`}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductionHouse;
