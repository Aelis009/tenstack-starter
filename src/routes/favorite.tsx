import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import PokemonGrid from '#/components/PokemonGrid'
import { getPokemonFn } from '#/server/pokemon'

type Pokemon = {
  name: string
  url: string
  image: string
}

export const Route = createFileRoute('/favorite')({
  component: FavoritePage,
  loader: async () => getPokemonFn(),
})

function FavoritePage() {
  const pokemon = Route.useLoaderData()
  const [favoriteNames, setFavoriteNames] = useState<string[]>([])

  useEffect(() => {
    const names = pokemon
      .map((item : any) => item.name)
      .filter((name :any) => localStorage.getItem(`liked-${name}`) === 'true')

    setFavoriteNames(names)
  }, [pokemon])

  const favoritePokemon = (pokemon as Pokemon[]).filter((item) =>
    favoriteNames.includes(item.name),
  )

  const handleFavoriteChange = (name: string, liked: boolean) => {
    setFavoriteNames((current) =>
      liked
        ? current.includes(name)
          ? current
          : [...current, name]
        : current.filter((favoriteName) => favoriteName !== name),
    )
  }

  return (
    <div className="p-4">
      {favoritePokemon.length === 0 ? (
        <p className="p-4 text-center text-gray-500">No favorite Pokemon yet.</p>
      ) : (
        <PokemonGrid
          pokemon={favoritePokemon}
          onFavoriteChange={handleFavoriteChange}
        />
      )}
    </div>
  )
}
