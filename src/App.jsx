import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Categories from "./pages/Categories";
import RecipeDetails from "./components/RecipeDetails";
import CategorieDetails from "./components/CategorieDetails";
import Footer from "./components/Footer";

function App() {
  return (
    <main>
      <NavBar />
      <div className="w-[90%] sm:w-[85%] md:w-[75%] mx-auto py-[30px] min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/categories" element={<Categories />}>
            <Route index element={<CategorieDetails />} />
            <Route path=":categorieName" element={<CategorieDetails />} />
          </Route>
          <Route
            path="/:categorieName/:recipeName/:id"
            element={<RecipeDetails />}
          />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
