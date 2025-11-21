// src/components/ProfileCard.jsx

function ProfileCard({ profile, onClick }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                 cursor-pointer"
      onClick={onClick}
    >
      <img
        className="w-full h-40 object-cover object-center"
        src={profile.foto}
        alt={profile.nome}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{profile.nome}</h3>
        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
          {profile.cargo}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 mb-3">
          {profile.localizacao}
        </p>
        
        {/* Principais Skills */}
        <div className="flex flex-wrap gap-1">
          {profile.habilidadesTecnicas.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 
                         px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
          {profile.habilidadesTecnicas.length > 3 && (
             <span className="text-xs bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
              +{profile.habilidadesTecnicas.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;