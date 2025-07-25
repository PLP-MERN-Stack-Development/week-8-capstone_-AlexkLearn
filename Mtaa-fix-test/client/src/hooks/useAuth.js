import { useContext } from 'react';
import { AuthProvider} from '../context/AuthContext.jsx';

const useAuth = () => useContext(AuthProvider);

export default useAuth;