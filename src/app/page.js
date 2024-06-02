"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./components/ui/button";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeGenre, setActiveGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      };

      try {
        const [moviesResponse, genresResponse] = await Promise.all([
          fetch("https://api.themoviedb.org/3/movie/popular", options),
          fetch("https://api.themoviedb.org/3/genre/movie/list", options),
        ]);

        const moviesData = await moviesResponse.json();
        const genresData = await genresResponse.json();

        setMovies(moviesData.results);
        setGenres(genresData.genres);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  const handleGenreFilter = (genre) => {
    setActiveGenre(genre);
  };

  const getGenreNames = (genresIds) => {
    return genresIds
      .map((id) => genres.find((genre) => genre.id === id)?.name)
      .join(", ");
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      !activeGenre || movie.genre_ids.includes(parseInt(activeGenre));
    const matchesSearch =
      !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <section className="bg-[#F3F4F6] py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <input
              type="text"
              placeholder="Buscar películas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-1/2 mb-4 md:mb-0 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <select
              value={activeGenre}
              onChange={(e) => handleGenreFilter(e.target.value)}
              className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Géneros</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="relative group">
                <Link
                  href={`/movies/${movie.id}`}
                  className="absolute inset-0 z-10"
                  prefetch={false}
                >
                  <span className="sr-only">View Movie</span>
                </Link>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="rounded-lg object-cover w-full aspect-[2/3] group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1E40AF]/80 to-transparent p-4 rounded-b-lg">
                  <h3 className="text-xl font-bold">{movie.title}</h3>
                  <p className="text-sm text-[#D1D5DB]">
                    {getGenreNames(movie.genre_ids)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
