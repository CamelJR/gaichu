import { useNavigate, useParams } from "react-router-dom";
import { getSets } from "../hooks/getCollection";
import Tile from "./Tile";

export interface SetsListProps {
  size: "large" | "small";
}

const setsList: React.FC<SetsListProps> = ({ size }) => {
  const navigate = useNavigate();
  const { seriesShortName } = useParams();
  const { data: collectionSet, error } = getSets(seriesShortName);

  if (error) return <p>Something went wrong...</p>;
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {collectionSet?.map((set) => (
        <Tile
          key={set.set.short_name}
          onClick={() =>
            navigate(`/cards/${seriesShortName}/sets/${set.set.short_name}`)
          }
        >
          <div className="flex h-full flex-col items-center justify-center">
            <img
              src={set.set.logo}
              alt={set.set.short_name}
              sizes={size}
              className={`w-full ${size === "large" ? "h-auto max-h-[400px]" : "h-auto max-h-[150px]"} rounded-md object-contain`}
            />
            <h3 className="text-lg">{set.set.name}</h3>
            <p className="text-secondaryText text-center">{set.cards.length}</p>
          </div>
        </Tile>
      ))}
    </div>
  );
};

export default setsList;
