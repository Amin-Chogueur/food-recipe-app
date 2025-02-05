import { createContext, useEffect, useState } from "react";

export const favoriteContext = createContext();

function FavoriteContextProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("recipes")) || [];
  });

  function addToLocalStorage(recipe, strCategory = null) {
    setFavorites((prevFavorites) => {
      const isExist = favorites.find((item) => item.idMeal === recipe.idMeal);
      if (isExist) {
        return favorites.filter((item) => item.idMeal !== recipe.idMeal);
      }
      return [
        {
          idMeal: recipe.idMeal,
          strArea: recipe.strArea,
          strMeal: recipe.strMeal,
          strMealThumb: recipe.strMealThumb,
          strCategory: recipe.strCategory || strCategory,
        },
        ...prevFavorites,
      ];
    });
  }

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <favoriteContext.Provider value={{ favorites, addToLocalStorage }}>
      {children}
    </favoriteContext.Provider>
  );
}

export default FavoriteContextProvider;
