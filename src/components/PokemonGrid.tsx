
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import SkillCard from "./SkillCard";

type Pokemon = {
  name: string;
  url: string;
  image: string;
};

type PokemonGridProps = {
  pokemon: Pokemon[];
  onFavoriteChange?: (name: string, liked: boolean) => void;
};

export default function PokemonGrid({ pokemon, onFavoriteChange }: PokemonGridProps) {
  const parentRef = useRef<HTMLDivElement>(null);


  const rows: Pokemon[][] = [];

  for (let i = 0; i < pokemon.length; i += 4) {
    rows.push(pokemon.slice(i, i + 4));
  }

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    overscan: 3,
  });

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-6rem)] w-full overflow-y-auto overflow-x-hidden"
    >
      <div
        className="relative w-full"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            data-index={virtualRow.index}
            ref={rowVirtualizer.measureElement}
            className="absolute left-0 top-0 w-full"
            style={{
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 ">
              {rows[virtualRow.index].map((item) => (
                <SkillCard
                  key={item.name}
                  name={item.name}
                  image={item.image}
                  url={item.url}
                  onFavoriteChange={onFavoriteChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
