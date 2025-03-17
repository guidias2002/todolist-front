import React from "react";
import { Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

type OrderTasksProps = {
    onOrder: () => void;
};

const OrderTasksByDueDate: React.FC<OrderTasksProps> = ({ onOrder }) => {
    return (
        <Button
            variant="contained"
            startIcon={<SortIcon />}
            color="primary"
            onClick={onOrder}
            className="h-12 min-w-[150px] !bg-blue-600 hover:!bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all"
        >
            Ordenar todas por data
        </Button>
    );
};

export default OrderTasksByDueDate;

