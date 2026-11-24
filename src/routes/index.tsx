import { createFileRoute} from "@tanstack/react-router";
import PokemonGrid from "#/components/PokemonGrid";
import { getPokemonFn } from "#/server/pokemon";

export const Route = createFileRoute("/")({
  component: Home,
  pendingComponent: () => (
    <div className="p-8">
      <p className="text-center text-lg font-medium text-gray-900">
        Loading...
      </p>
    </div>
  ),
  pendingMs: 200,

  loader: async () => {
    const data = await getPokemonFn();
    return data;
  },

  notFoundComponent: () => (
    <div className="p-8">
      <p className="text-center text-lg font-medium text-gray-500">
        No Pokemon found.
      </p>
    </div>
  ),
});

function Home() {
  const data = Route.useLoaderData();

  return (
    <div className="p-8">
      <PokemonGrid pokemon={data} />
    </div>
  );
}
