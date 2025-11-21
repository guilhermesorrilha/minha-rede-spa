// src/components/Header.jsx
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // (instale: npm install @heroicons/react)

function Header({
  isDarkMode,
  toggleDarkMode,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  uniqueAreas,
  uniqueLocalizacoes
}) {

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          FutureNet
        </h1>
        
        {/* Filtros e Busca */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            placeholder="Buscar por nome, cargo..."
            className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            name="area"
            className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            value={filters.area}
            onChange={handleFilterChange}
          >
            <option value="">Todas as Áreas</option>
            {uniqueAreas.map(area => <option key={area} value={area}>{area}</option>)}
          </select>
          <select
            name="localizacao"
            className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            value={filters.localizacao}
            onChange={handleFilterChange}
          >
            <option value="">Todas as Cidades</option>
            {uniqueLocalizacoes.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
           <input
            type="text"
            name="tecnologia"
            placeholder="Filtrar por tecnologia..."
            className="p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            value={filters.tecnologia}
            onChange={handleFilterChange}
          />
        </div>

        {/* Botão Dark Mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-gray-500 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {isDarkMode ? (
            <SunIcon className="w-6 h-6" />
          ) : (
            <MoonIcon className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;