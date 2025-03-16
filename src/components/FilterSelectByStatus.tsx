import React, { useState } from "react";
import { MenuItem, FormControl, Select, InputLabel, SelectChangeEvent } from "@mui/material";

export default function FilterSelectByStatus({ onChange }: { onChange: (status: string) => void }) {
  const [selectedStatus, setSelectedStatus] = useState("TODAS");

  const handleStatusChange = (event: SelectChangeEvent) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    onChange(newStatus);
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
          <MenuItem value="TODAS">Todas</MenuItem>
          <MenuItem value="PENDENTE">Pendente</MenuItem>
          <MenuItem value="EM_ANDAMENTO">Em andamento</MenuItem>
          <MenuItem value="CONCLUIDO">Concluído</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
