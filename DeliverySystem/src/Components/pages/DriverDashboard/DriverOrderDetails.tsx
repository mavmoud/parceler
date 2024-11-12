import { useState } from "react";
import { Grid2, Typography, Select } from "@mui/material";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  ORDER_STATUS_OPTIONS,
  OPTION_VALUE,
  OPTION_NAME,
  ORDER_STATUS_MAP,
} from "./constants";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { SelectChangeEvent } from "@mui/material/Select";
import { iconMap } from "../HomePage/Track";

export const DriverOrderDetails = ({ order }) => {
  const [orderStatus, setOrderStatus] = useState(
    ORDER_STATUS_MAP.get(order?.latestStatusName)
  );

  const handleChange = (event: SelectChangeEvent) => {
    setOrderStatus(event.target.value as string);
  };

  return (
    <AccordionDetails>
      <Grid2 container gap={13}>
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
          <Typography>
            <b>Recipient address: </b> {order.recipientAddress}
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
              value={orderStatus}
              label="Order status"
              onChange={handleChange}
            >
              {ORDER_STATUS_OPTIONS?.map((option) => {
                return (
                  <MenuItem value={option[OPTION_VALUE]}>
                    <Grid2 container gap="1.0rem">
                      <Typography>
                        {iconMap.get(option[OPTION_NAME])?.()}
                      </Typography>
                      <Typography>{option[OPTION_NAME]}</Typography>
                    </Grid2>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
    </AccordionDetails>
  );
};
