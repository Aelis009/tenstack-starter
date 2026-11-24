import { createServerFn } from "@tanstack/react-start";
const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon?limit=2000";

export const getPokemonFn = createServerFn({method : 'GET'}).handler(async () => {
    
    const response = await fetch(POKE_API_URL);
    
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon");
        }
    
        const data = await response.json();
    
        if (!data.results || data.results.length === 0) {
          throw new Error("No Pokemon found.");
        }
    
        const pokemon = data.results.map((item: { name: string; url: string }) => {
          const id = item.url.split("/").filter(Boolean).pop();
    
          return {
            name: item.name,
            url: item.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });
    
        return pokemon;
})

export const saveFavoritePokemonFn = createServerFn({method : 'POST'})
.validator((name: string) => name)
.handler(async ({data}) => {
    console.log("Saving favorite Pokemon:");
    await new Promise((resolve)=> setTimeout(resolve, 1000));
    return {success: true, message: "Favorite Pokemon saved successfully!" ,data : data}
})