const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div>
      <span className="ml-4 text-red-700">{message || 'Ocorreu um erro. Tente novamente mais tarde.'}</span>
    </div>
  );
};

export default ErrorMessage;
