import { useCallback, useState } from "react";
import { Grid2, Typography, Select, Button } from "@mui/material";
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
    order.latestStatusName,
  );
  const [orderStatus, setOrderStatus] = useState<number | undefined>(
    getStatusId(order.latestStatusName) || 0,
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
    } catch (error) {
      enqueueSnackbar("Status update failed. Please try again.", {
        variant: "error",
      });
    }
  }, [order.id, orderStatus, enqueueSnackbar]);

  return (
    <AccordionDetails>
      <Grid2
        container
        gap={2}
        sx={{
          width: "770px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid2>
          <Typography sx={{ fontFamily: '"Montserrat", serif' }}>
            <b>Sender: </b>
            {`${order.senderFirstName} ${order.senderLastName}`}
          </Typography>
          <Typography sx={{ fontFamily: '"Montserrat", serif' }}>
            <b>Recipient: </b>{" "}
            {`${order.recipientFirstName} ${order.recipientLastName}`}
          </Typography>
          <Typography sx={{ fontFamily: '"Montserrat", serif' }}>
            <b>Package weight: </b> {order.packageWeight} g
          </Typography>
        </Grid2>
        <Grid2>
          <Typography
            style={{ maxWidth: "250px", fontFamily: '"Montserrat", serif' }}
          >
            <span>
              <b>Recipient address: </b> <br /> {order.recipientAddress}
            </span>
          </Typography>
        </Grid2>
        <Grid2 width={"15rem"}>
          <FormControl sx={{ width: "280px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{
                display: "none",
              }}
            >
              Order status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getStatusName(orderStatus || 0)}
              label="Order status"
              onChange={handleChange}
              sx={{
                height: "60px",
                pb: "5px",
                borderRadius: "35px",
                "& .MuiOutlinedInput-notchedOutline": {
                  legend: {
                    display: "none",
                  },
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#071528",
                },
              }}
            >
              {ORDER_STATUS_OPTIONS?.map((option) => {
                return (
                  <MenuItem
                    value={option.name}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Grid2 container gap="1.0rem">
                      <Typography>{iconMap.get(option.name)?.()}</Typography>
                      <Typography
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          fontFamily: '"Montserrat", serif',
                        }}
                      >
                        {option.name}
                      </Typography>
                    </Grid2>
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              variant="contained"
              disableRipple
              sx={{
                borderRadius: "30px",
                backgroundColor: "#071528",
                fontFamily: '"Montserrat", serif',
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "medium",
                height: "50px",
                boxShadow: "none",
                mt: "10px",
              }}
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
