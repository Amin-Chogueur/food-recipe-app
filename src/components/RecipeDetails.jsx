import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Utensils, Youtube } from "lucide-react";
import useFavoriteContext from "../hooks/useFavoriteContext";
import axios from "axios";
function RecipeDetails() {
  const { favorites, addToLocalStorage } = useFavoriteContext();
  const { id } = useParams(); // Extract 'id' from the URL
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState();
  async function fetchRecipeDetails(id) {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const recipe = res.data.meals;
      setRecipe(recipe[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  function getIngredientsArray(recipe) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "" && ingredient !== null) {
        ingredients.push(`${measure ? measure + " " : ""}${ingredient}`);
      }
    }
    return ingredients;
  }
  useEffect(() => {
    fetchRecipeDetails(id);
  }, [id]);
  return (
    <div>
      {loading && (
        <p className="text-center text-3xl mt-5 font-bold">Loaing...</p>
      )}
      {recipe && (
        <div>
          {" "}
          <h1 className="text-center text-3xl  my-10 text-green-600">
            {recipe.strMeal}
          </h1>
          <div className="flex flex-col lg:flex-row gap-[50px] ">
            <div className="relative w-fit h-fit mx-auto bg-red-300 rounded-md">
              <img
                src={recipe.strMealThumb}
                alt="recipe img"
                className="rounded-md w-[300px] mx-auto  object-cover  "
              />
              <div className="absolute bottom-2 left-2 bg-amber-600 text-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                <Utensils size={16} /> {recipe.strCategory}
              </div>
              <button
                onClick={() => addToLocalStorage(recipe)}
                className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
              >
                <Heart
                  size={20}
                  className="hover:fill-red-500 hover:text-red-500 text-black"
                  style={
                    favorites.find((item) => item.idMeal === recipe.idMeal) && {
                      fill: "red",
                      color: "red",
                    }
                  }
                />
              </button>
            </div>

            <div>
              <h3 className="mb-[20px] text-xl  font-bold text-orange-400">
                Ingredients :
              </h3>
              <div className="flex flex-wrap gap-5 mb-[20px]">
                {getIngredientsArray(recipe).map((ingredient, i) => (
                  <p key={i}>- {ingredient}</p>
                ))}
              </div>
              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  className={`w-fit flex gap-1  items-center p-1 rounded-md bg-gray-700`}
                >
                  <Youtube size={16} />

                  <span className="text-sm tracking-tighter font-semibold">
                    Video On YouTube
                  </span>
                </a>
              )}
            </div>
          </div>
          <p className="my-[20px] text-xl  font-bold text-orange-400">
            Instructions :
          </p>
          <p className="text-xl">{recipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
