import { MenuItem, FormControl, Select, InputLabel, SelectChangeEvent } from "@mui/material";
import { SelectableTaskStatus } from "../shared/enums/TaskStatusEnum";

interface FilterSelectByStatusProps {
  onChange: (status: SelectableTaskStatus) => void;
  selectedStatus: SelectableTaskStatus;   
  setSelectedStatus: any;
}

export default function FilterSelectByStatus({ onChange, selectedStatus, setSelectedStatus }: FilterSelectByStatusProps) {

  const handleStatusChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    onChange(newStatus as SelectableTaskStatus);
  };

  return (
    <div className="w-full max-w-xs">
      <FormControl fullWidth>
        <InputLabel id="status-filter-label">Filtrar por status</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={selectedStatus}
          onChange={handleStatusChange}
          label="Filtrar por status"
        >
          <MenuItem value={SelectableTaskStatus.TODAS}>Todas</MenuItem>
          <MenuItem value={SelectableTaskStatus.PENDENTE}>Pendente</MenuItem>
          <MenuItem value={SelectableTaskStatus.EM_ANDAMENTO}>Em andamento</MenuItem>
          <MenuItem value={SelectableTaskStatus.CONCLUIDO}>Concluído</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
