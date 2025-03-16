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
        >
            Ordernar todas por data
        </Button>
    );
};

export default OrderTasksByDueDate;
