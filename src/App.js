import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";
import Movie from "./Movie";
import Filter from "./Filter";

function App() {
    const [popular, setPopular] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeGenre, setActiveGenre] = useState(0);

    useEffect(() => {
        fetchPopular();
    }, []);
    const fetchPopular = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=2717348bfb61632f343151a4bc33d863&language=en-US&page=1"
        );
        const movies = await data.json();
        setPopular(movies.results);
        setFiltered(movies.results);
    };
    return (
        <div className="App">
            <Filter
                popular={popular}
                setFiltered={setFiltered}
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
            />
            <motion.div animate={{ y: 100 }} className="popular-movies">
                {filtered.map((movie) => {
                    return <Movie key={movie.id} movie={movie} />;
                })}
            </motion.div>
        </div>
    );
}

export default App;
