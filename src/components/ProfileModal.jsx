// src/components/ProfileModal.jsx
import { XMarkIcon } from '@heroicons/react/24/solid';

// Componente auxiliar para seções
const ModalSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-3 border-b border-gray-300 dark:border-gray-600 pb-2">
      {title}
    </h3>
    {children}
  </div>
);

// Componente auxiliar para tags/skills
const Tag = ({ item }) => (
  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">
    {item}
  </span>
);


function ProfileModal({ profile, onClose }) {
  // Funções de clique dos botões (Requisito: "Devem estar funcionando")
  const handleRecommend = () => {
    alert(`Você recomendou ${profile.nome}!`);
  };

  const handleSendMessage = () => {
    alert(`Abrindo chat com ${profile.nome}... (simulação)`);
  };

  return (
    // Overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose} // Fecha ao clicar fora
    >
      {/* Conteúdo do Modal */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl 
                   max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // Impede de fechar ao clicar dentro
      >
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full text-gray-500 
                     hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Header do Perfil */}
        <div className="p-6 md:p-8 border-b dark:border-gray-700 flex flex-col sm:flex-row items-center gap-6">
          <img
            className="w-32 h-32 rounded-full object-cover shadow-md"
            src={profile.foto}
            alt={profile.nome}
          />
          <div>
            <h2 className="text-3xl font-bold">{profile.nome}</h2>
            <p className="text-xl text-blue-600 dark:text-blue-400">{profile.cargo}</p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{profile.localizacao}</p>
            <p className="text-gray-700 dark:text-gray-300 mt-3">{profile.resumo}</p>
          </div>
        </div>

        {/* Corpo do Modal */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Coluna Principal (Experiência, Formação) */}
          <div className="md:col-span-2">
            <ModalSection title="Experiência Profissional">
              {profile.experiencias.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-semibold">{exp.cargo}</h4>
                  <p className="text-md text-gray-700 dark:text-gray-300">{exp.empresa}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {exp.inicio} - {exp.fim}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{exp.descricao}</p>
                </div>
              ))}
            </ModalSection>

            <ModalSection title="Formação Acadêmica">
              {profile.formacao.map((form, index) => (
                <div key={index} className="mb-3">
                  <h4 className="text-lg font-semibold">{form.curso}</h4>
                  <p className="text-md text-gray-700 dark:text-gray-300">{form.instituicao} ({form.ano})</p>
                </div>
              ))}
            </ModalSection>
          </div>

          {/* Coluna Lateral (Skills, Hobbies) */}
          <div className="md:col-span-1">
            <ModalSection title="Hard Skills">
              <div className="flex flex-wrap">
                {profile.habilidadesTecnicas.map((skill) => <Tag key={skill} item={skill} />)}
              </div>
            </ModalSection>
            
            <ModalSection title="Soft Skills">
               <div className="flex flex-wrap">
                {profile.softSkills.map((skill) => <Tag key={skill} item={skill} />)}
              </div>
            </ModalSection>
            
            <ModalSection title="Idiomas">
              <ul>
                {profile.idiomas.map((lang, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    <strong>{lang.idioma}:</strong> {lang.nivel}
                  </li>
                ))}
              </ul>
            </ModalSection>

             <ModalSection title="Áreas de Interesse">
               <div className="flex flex-wrap">
                {profile.areaInteresses.map((interest) => <Tag key={interest} item={interest} />)}
              </div>
            </ModalSection>
          </div>
        </div>

        {/* Footer com Ações */}
        <div className="p-6 md:p-8 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 
                    flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handleRecommend}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md 
                       font-semibold hover:bg-blue-700 transition-colors"
          >
            Recomendar Profissional
          </button>
          <button 
            onClick={handleSendMessage}
            className="w-full sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-100 
                       rounded-md font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
          >
            Enviar Mensagem
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;