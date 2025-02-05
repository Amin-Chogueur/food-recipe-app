import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
function CategorieDetails() {
  const { categorieName } = useParams();
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  async function fetchRecipes(categorie = "Beef") {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`
      );

      const recipes = response.data.meals;

      setRecipes(recipes);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecipes(categorieName);
  }, [categorieName]);

  return (
    <div>
      {loading && (
        <p className="text-center text-3xl mt-5 font-bold">Loaing...</p>
      )}
      <div className="grid gap-5 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 my-[60px]">
        {!loading &&
          recipes &&
          recipes.map((recipe) => (
            <RecipeCard
              strCategory={categorieName}
              key={recipe.idMeal}
              recipe={recipe}
              link={`/${categorieName || "Beef"}/${recipe.strMeal.replace(
                / /g,
                "-"
              )}/${recipe.idMeal}`}
            />
          ))}
      </div>
      {!loading && !recipes && (
        <p className="text-center text-3xl mt-5 font-bold">No Meals found !</p>
      )}
    </div>
  );
}

export default CategorieDetails;
