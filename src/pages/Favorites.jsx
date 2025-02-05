import RecipeCard from "../components/RecipeCard";
import useFavoriteContext from "../hooks/useFavoriteContext";
function Favorites() {
  const { favorites } = useFavoriteContext();
  return (
    <div style={{ color: "var(--text)" }}>
      <p className="text-center text-3xl my-8 text-green-600">My Favorites</p>
      {favorites.length === 0 && (
        <p className="text-center text-3xl mt-5 font-bold">
          You do not have any favorite recipe !
        </p>
      )}
      <div className="grid gap-5 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 my-[60px]">
        {favorites &&
          favorites.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              link={`/${recipe.strCategory}/${recipe.strMeal.replace(
                / /g,
                "-"
              )}/${recipe.idMeal}`}
            />
          ))}
      </div>
    </div>
  );
}
export default Favorites;
