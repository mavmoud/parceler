import { Button } from "@mui/material";
import { useCallback } from "react";
import { OrderService } from "../services";

export const Test = () => {
  const onClick = useCallback(async () => {
    await OrderService.GetOrdersBySenderId(2);
  }, []);
  return (
    <>
      <Button variant="text" onClick={onClick}>
        Text
      </Button>
    </>
  );
};
