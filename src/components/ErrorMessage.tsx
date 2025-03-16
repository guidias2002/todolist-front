import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex justify-center items-center p-4 bg-red-100 border border-red-500 rounded-md">
      <ErrorOutlineIcon className="text-red-700" />
      <span className="ml-4 text-red-700">{message || 'Ocorreu um erro. Tente novamente mais tarde.'}</span>
    </div>
  );
};

export default ErrorMessage;
