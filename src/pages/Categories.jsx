import axios from "axios";
import { useEffect, useState } from "react";
import CategoryCard from "../components/categoryCard";
import { Outlet } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchCategories() {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const categories = res.data.categories;
      setCategories(categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <h1 className="text-center text-3xl my-8 text-green-600">
        {" "}
        Browse By Category
      </h1>

      <div className="flex flex-wrap gap-6 text-xl mx-auto justify-center  my-[60px]">
        {!loading &&
          categories &&
          categories.map((categorie) => (
            <CategoryCard key={categorie.idCategory} categorie={categorie} />
          ))}
      </div>
      {!loading && !categories && (
        <p className="text-center text-3xl mt-5 font-bold">No Meals found !</p>
      )}

      <Outlet />
    </div>
  );
}

export default Categories;
