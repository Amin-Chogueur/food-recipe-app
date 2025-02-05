import { Link, useParams } from "react-router-dom";
import { Utensils } from "lucide-react";

function CategoryCard({ categorie }) {
  const { categorieName } = useParams();

  return (
    <Link
      to={`${categorie.strCategory}`}
      className="flex items-center  gap-2 cursor-pointer  bg-[#222] p-2 rounded-md hover:text-green-600"
      style={
        categorieName === categorie.strCategory ||
        (categorie.strCategory === "Beef" && categorieName === undefined)
          ? { backgroundColor: "darkgreen" }
          : { backgroundColor: "#222" }
      }
    >
      <Utensils size={16} />
      <p>{categorie.strCategory}</p>
    </Link>
  );
}

export default CategoryCard;
