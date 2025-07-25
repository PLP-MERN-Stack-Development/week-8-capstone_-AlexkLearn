const ProfileHeader = ({ name, role, photo }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <img
        src={photo || '/placeholder.jpg'}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-600 capitalize">{role}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;