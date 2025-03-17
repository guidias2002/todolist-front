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
    <div className="min-w-[200px]">
      <FormControl fullWidth>
        <InputLabel id="status-filter-label">Filtrar por status</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={selectedStatus}
          onChange={handleStatusChange}
          label="Filtrar por status"
          size="medium"
          className="h-12"
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

