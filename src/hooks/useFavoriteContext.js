import { useContext } from "react";
import { favoriteContext } from "../context/FavoriteContext";

function useFavoriteContext() {
  const context = useContext(favoriteContext);
  return context;
}

export default useFavoriteContext;
