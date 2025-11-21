// src/App.jsx
import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ProfileList from './components/ProfileList';
import ProfileModal from './components/ProfileModal';

function App() {
  // Estado para o Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verifica preferência do usuário no localStorage
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Estado para os perfis
  const [allProfiles, setAllProfiles] = useState([]); // Lista original
  const [selectedProfile, setSelectedProfile] = useState(null); // Perfil no modal

  // Estado para filtros e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    area: '',
    localizacao: '',
    tecnologia: '',
  });

  // Efeito para carregar os dados do JSON
  useEffect(() => {
    fetch('/db.json')
      .then((response) => response.json())
      .then((data) => {
        setAllProfiles(data);
      })
      .catch((error) => console.error('Erro ao carregar perfis:', error));
  }, []);

  // Efeito para aplicar o Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', JSON.stringify(true));
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', JSON.stringify(false));
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Lógica de filtragem e busca
  const filteredProfiles = useMemo(() => {
    return allProfiles.filter((profile) => {
      const searchLower = searchTerm.toLowerCase();
      const techLower = filters.tecnologia.toLowerCase();

      // Verifica busca (nome, cargo, resumo)
      const matchesSearch =
        profile.nome.toLowerCase().includes(searchLower) ||
        profile.cargo.toLowerCase().includes(searchLower) ||
        profile.resumo.toLowerCase().includes(searchLower);

      // Verifica filtro de área
      const matchesArea =
        !filters.area || profile.area === filters.area;

      // Verifica filtro de localização (cidade)
      const matchesLocalizacao =
        !filters.localizacao ||
        profile.localizacao.toLowerCase().includes(filters.localizacao.toLowerCase());

      // Verifica filtro de tecnologia (em habilidadesTecnicas)
      const matchesTecnologia =
        !techLower ||
        profile.habilidadesTecnicas.some((skill) =>
          skill.toLowerCase().includes(techLower)
        );

      return matchesSearch && matchesArea && matchesLocalizacao && matchesTecnologia;
    });
  }, [allProfiles, searchTerm, filters]);

  // Funções de extração para os filtros (para evitar duplicatas)
  const uniqueAreas = useMemo(() => 
    [...new Set(allProfiles.map(p => p.area))], 
    [allProfiles]
  );
  
  // Apenas para fins de exemplo. Cidades podem ser muitas.
  const uniqueLocalizacoes = useMemo(() => 
    [...new Set(allProfiles.map(p => p.localizacao.split('/')[0]))], // Pega só a cidade
    [allProfiles]
  );


  // Funções do Modal
  const openModal = (profile) => {
    setSelectedProfile(profile);
  };

  const closeModal = () => {
    setSelectedProfile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        uniqueAreas={uniqueAreas}
        uniqueLocalizacoes={uniqueLocalizacoes}
      />
      <main className="container mx-auto p-4">
        <ProfileList profiles={filteredProfiles} onProfileClick={openModal} />
      </main>

      {selectedProfile && (
        <ProfileModal profile={selectedProfile} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;