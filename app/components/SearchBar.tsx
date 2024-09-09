const SearchBar = ({ searchTerm, onSearch }: { searchTerm: string; onSearch: (term: string) => void }) => {
    return (
        <div className="container px-4 py-8">
            <input
                type="text"
                id="pokemon-search" 
                name="pokemon-search" 
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search Pokémon..."
                className="w-full p-2 rounded border border-gray-300 text-pokeGray bg-white"
            />
        </div>
    );
    };

export default SearchBar;
