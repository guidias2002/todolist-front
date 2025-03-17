import React from "react";
import { Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

type OrderTasksProps = {
    onOrder: () => void;
};

const OrderTasksByDueDate: React.FC<OrderTasksProps> = ({ onOrder }) => {
    return (
        <Button
            variant="outlined"
            startIcon={<SortIcon />}
            color="primary"
            onClick={onOrder}
            className="h-12 py-2 flex items-center gap-2 whitespace-nowrap"
        >
            Ordenar todas por data
        </Button>
    );
};

export default OrderTasksByDueDate;

