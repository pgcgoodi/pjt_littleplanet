import { useNavigate } from 'react-router-dom';

function useMovePage() {
	const navigate = useNavigate();

	return [navigate, () => navigate(-1)];
}

export default useMovePage;
