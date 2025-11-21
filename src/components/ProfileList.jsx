// src/components/ProfileList.jsx
import ProfileCard from './ProfileCard';

function ProfileList({ profiles, onProfileClick }) {
  if (profiles.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Nenhum perfil encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onClick={() => onProfileClick(profile)}
        />
      ))}
    </div>
  );
}

export default ProfileList;