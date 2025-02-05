import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";

import axios from "axios";
import { useEffect, useState } from "react";
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function Home() {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [currentLetter, setCurentLetter] = useState("a");
  const [searchName, setSearchName] = useState("");

  async function fetchRecipes(letter = "a", searchName = undefined) {
    setCurentLetter(letter);
    try {
      setLoading(true);
      let response;
      if (searchName === undefined) {
        response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
      } else {
        response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
        );
      }

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
    fetchRecipes();
  }, []);

  return (
    <div>
      <div>
        <div className="mt-6">
          <label className="flex shadow-md items-center gap-2  bg-[#222] p-2 rounded-lg">
            <input
              type="text"
              className="text-lg md:text-md grow p-1 outline-none"
              placeholder="What do you crave today?"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <button onClick={() => fetchRecipes(null, searchName)}>
              {" "}
              <Search className="cursor-pointer" />
            </button>
          </label>
        </div>

        <div className="mt-5">
          <h2 className="text-center text-3xl mb-5 text-green-600">
            Browse By Name
          </h2>
          <div className="flex flex-wrap gap-6 text-xl mx-auto justify-center ">
            {alphabet.map((letter) => (
              <button
                key={letter}
                className="cursor-pointer hover:text-green-500 bg-[#222] px-4 rounded"
                style={
                  currentLetter === letter.toLocaleLowerCase()
                    ? { backgroundColor: "darkgreen" }
                    : { background: "#222" }
                }
                onClick={() => fetchRecipes(letter.toLocaleLowerCase())}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
        {loading && (
          <p className="text-center text-3xl mt-5 font-bold">Loaing...</p>
        )}
        <div className="grid gap-5 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 my-[60px]">
          {!loading &&
            recipes &&
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                link={`${recipe.strCategory}/${recipe.strMeal.replace(
                  / /g,
                  "-"
                )}/${recipe.idMeal}`}
              />
            ))}
        </div>
        {!loading && !recipes && (
          <p className="text-center text-3xl mt-5 font-bold">
            No Meals found !
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
