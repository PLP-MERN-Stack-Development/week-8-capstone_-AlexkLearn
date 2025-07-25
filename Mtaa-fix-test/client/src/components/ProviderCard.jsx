import { Link } from "react-router-dom";

const ProviderCard = ({ provider }) => {
  return (
    <Link to={`/provider/${provider._id}`}>
        <div className="bg-white rounded-xl shadow hover:scale-[1.03] transition duration-300 overflow-hidden">
        <img src={provider.photo || '/placeholder.jpg'} alt={provider.name} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg">{provider.user?.name}</h3>
            <p className="text-sm text-gray-600">{provider.skill} - {provider.location}</p>
            <p className="text-xs mt-1 text-gray-500">{provider.description}</p>
        </div>
        </div>
    </Link>
  );
};

export default ProviderCard;