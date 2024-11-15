import { useCallback, useState } from "react";
import { Grid2, Typography, Select, Button, Tooltip } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ORDER_STATUS_OPTIONS, getStatusId, getStatusName } from "./constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import { iconMap } from "../HomePage/Track";
import { OrderService } from "../../../services";
import { Order } from "models";
import { useSnackbar } from "notistack";

interface DriverOrderDetailsProps {
  order: Order;
}

export const DriverOrderDetails: React.FC<DriverOrderDetailsProps> = ({
  order,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [latestStatusName, setLatestStatusName] = useState<string>(
    order.latestStatusName
  );
  const [orderStatus, setOrderStatus] = useState<number | undefined>(
    getStatusId(order.latestStatusName) || 0
  );

  const handleChange = (event: SelectChangeEvent) => {
    setOrderStatus(getStatusId(event.target.value));
  };

  const handleOnClick = useCallback(async () => {
    try {
      const res = await OrderService.UpdateStatus(order.id, orderStatus || 0);
      const newStatus = res.data.updatedOrder.latestStatusName;
      setLatestStatusName(newStatus);
      setOrderStatus(getStatusId(newStatus));
      enqueueSnackbar("Status updated successfully! ", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Status update failed. Please try again.", {
        variant: "error",
      });
    }
  }, [order.id, orderStatus, enqueueSnackbar]);

  return (
    <AccordionDetails>
      <Grid2 container gap={2}>
        <Grid2>
          <Typography>
            <b>Sender: </b>
            {`${order.senderFirstName} ${order.senderLastName}`}
          </Typography>
          <Typography>
            <b>Recipient: </b>{" "}
            {`${order.recipientFirstName} ${order.recipientLastName}`}
          </Typography>
        </Grid2>
        <Grid2>
          <Typography noWrap style={{ maxWidth: "380px" }}>
            <Tooltip title={order.recipientAddress}>
              <span>
                <b>Recipient address: </b> {order.recipientAddress}
              </span>
            </Tooltip>
          </Typography>
          <Typography>
            <b>Package weight: </b> {order.packageWeight}
          </Typography>
        </Grid2>
        <Grid2 width={"15rem"}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getStatusName(orderStatus || 0)}
              label="Order status"
              onChange={handleChange}
            >
              {ORDER_STATUS_OPTIONS?.map((option) => {
                return (
                  <MenuItem value={option.name}>
                    <Grid2 container gap="1.0rem">
                      <Typography>{iconMap.get(option.name)?.()}</Typography>
                      <Typography>{option.name}</Typography>
                    </Grid2>
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              variant="contained"
              sx={{ margin: "1rem 0rem" }}
              disabled={orderStatus === getStatusId(latestStatusName)}
              onClick={handleOnClick}
            >
              Update status
            </Button>
          </FormControl>
        </Grid2>
      </Grid2>
    </AccordionDetails>
  );
};
