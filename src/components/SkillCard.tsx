
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { saveFavoritePokemonFn } from "#/server/pokemon";

type SkillCardProps = {
  name: string;
  image: string;
  url: string;
  onFavoriteChange?: (name: string, liked: boolean) => void;
};

type PokemonDetails = {
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
};

const SkillCard = ({ name, image, url, onFavoriteChange }: SkillCardProps) => {
  const [liked, setLiked] = useState(false);
  const Likes = liked ? 1 : 0;
  const saveFavoritePokemon = useServerFn(saveFavoritePokemonFn);
  const { data, isLoading, isError } = useQuery<PokemonDetails>({
    queryKey: ["pokemon-details", url],
    queryFn: async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    const storedLiked = localStorage.getItem(`liked-${name}`);
    if (storedLiked !== null) {
      setLiked(storedLiked === "true");
    }
  }, [name]);

  const handleLike = async () => {
    const newLiked = !liked;

    setLiked(newLiked);
    localStorage.setItem(`liked-${name}`, newLiked.toString());
    onFavoriteChange?.(name, newLiked);

    if (newLiked) {
      await saveFavoritePokemon({ data: name });
    }
  };

  return (
    <article className="w-64 mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">

      <img
        src={image}
        alt={name || "Pokemon"}
        loading="lazy"
        className="h-40 w-full rounded-xl bg-gray-50 "
      />

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            {name || "Unknown pokemon"}
          </h2>

          <p className="text-sm font-medium text-gray-500">
            Likes: {Likes}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {isLoading && (
          <span className="text-xs text-gray-400">Loading types...</span>
        )}
        {isError && (
          <span className="text-xs text-red-500">Could not load types</span>
        )}
        {data?.types.map((item) => (
          <span
            key={item.slot}
            className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium capitalize text-green-700"
          >
            {item.type.name}
          </span>
        ))}
      </div>

      <button
        onClick={handleLike}
        className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition-all duration-200 hover:bg-rose-50 hover:scale-110 active:scale-95"
      >
        <Heart
          stroke={liked ? "red" : "currentColor"}
          fill={liked ? "red" : "none"}
          size={20}
          className="transition-colors duration-200"
        />
      </button>
    </article>
  );
};

export default SkillCard;
