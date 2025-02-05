import { Heart, Utensils, Youtube } from "lucide-react";

import { Link } from "react-router-dom";
import useFavoriteContext from "../hooks/useFavoriteContext";

function RecipeCard({ recipe, link, strCategory }) {
  const { favorites, addToLocalStorage } = useFavoriteContext();
  const isFavorite = favorites.find((item) => item.idMeal === recipe.idMeal);

  return (
    <div
      className={`flex flex-col rounded-md  overflow-hidden p-3 relative bg-[#222]`}
    >
      <Link to={link} className="relative h-32">
        <div />
        <img
          src={recipe.strMealThumb}
          alt="recipe img"
          className="rounded-md w-full h-full object-cover cursor-pointer "
        />
        <div className="absolute bottom-2 left-2 bg-amber-600 text-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
          <Utensils size={16} /> {recipe.strCategory}
        </div>
      </Link>

      <div className="flex mt-1">
        <p className="font-bold tracking-wide">{recipe.strMeal}</p>
      </div>
      <div className="flex justify-between items-center mt-5">
        {recipe.strArea && (
          <p className="my-2 bg-green-900 p-1 rounded-md">
            {recipe.strArea} Kitchen
          </p>
        )}

        <button
          onClick={() => addToLocalStorage(recipe, strCategory)}
          className=" bg-white rounded-full p-1 cursor-pointer"
        >
          <Heart
            size={20}
            className="hover:fill-red-500 hover:text-red-500 text-black"
            style={isFavorite && { fill: "red", color: "red" }}
          />
        </button>
      </div>
    </div>
  );
}
export default RecipeCard;
