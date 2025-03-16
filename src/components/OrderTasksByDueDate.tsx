import React from "react";
import { Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

type OrderTasksProps = {
    onOrder: () => void;
    isLoading: boolean;
};

const OrderTasksByDueDate: React.FC<OrderTasksProps> = ({ onOrder, isLoading }) => {
    return (
        <Button
            variant="contained"
            startIcon={<SortIcon />}
            color="primary"
            onClick={onOrder}
            disabled={isLoading}
        >
            {isLoading ? "Carregando..." : "Ordenar por data"}
        </Button>
    );
};

export default OrderTasksByDueDate;
