import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <CircularProgress className="text-blue-500" />
      <span className="ml-4 text-gray-600">Carregando...</span>
    </div>
  );
};

export default Loading;
