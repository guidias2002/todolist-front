import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const EmptyList = () => {
  return (
    <div className="flex justify-center items-center p-4 bg-blue-100 border border-blue-500 rounded-md">
      <AddCircleOutlineIcon className="text-blue-700" />
      <span className="ml-4 text-blue-700">Nenhuma tarefa registrada.</span>
    </div>
  );
};

export default EmptyList;