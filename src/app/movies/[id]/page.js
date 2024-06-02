"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchMovieDetails = async () => {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        };

        try {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}`,
            options
          );
          if (!movieResponse.ok) {
            throw new Error(`HTTP error! status: ${movieResponse.status}`);
          }
          const movieData = await movieResponse.json();
          setMovie(movieData);

          const genresResponse = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list",
            options
          );
          if (!genresResponse.ok) {
            throw new Error(`HTTP error! status: ${genresResponse.status}`);
          }
          const genresData = await genresResponse.json();
          setGenres(genresData.genres);

          const castResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits`,
            options
          );
          if (!castResponse.ok) {
            throw new Error(`HTTP error! status: ${castResponse.status}`);
          }
          const castData = await castResponse.json();
          setCast(castData.cast);

          const trailerResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos`,
            options
          );
          if (!trailerResponse.ok) {
            throw new Error(`HTTP error! status: ${trailerResponse.status}`);
          }
          const trailerData = await trailerResponse.json();
          const trailerVideo = trailerData.results.find(
            (video) => video.type === "Trailer"
          );
          setTrailer(trailerVideo?.key);

          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <section className="bg-[#F3F4F6] py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="Movie Poster"
                width={400}
                height={600}
                className="rounded-lg object-cover w-full aspect-[2/3]"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-[#1E40AF]">
                {movie.title}
              </h2>
              <p className="text-[#6B7280] mb-4">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="mb-8">{movie.overview}</p>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2 text-[#1E40AF]">
                  Reparto
                </h3>
                <div className="flex overflow-x-auto space-x-4">
                  {cast.map((member) => (
                    <div key={member.id} className="flex-shrink-0 w-36">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                        alt={member.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/200?text=No+Image";
                        }}
                        className="rounded-lg"
                      />
                      <p className="text-center text-sm mt-2">{member.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#1E40AF]">
                  Trailer
                </h3>
                {trailer ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${trailer}`}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                ) : (
                  <p>No trailer available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
