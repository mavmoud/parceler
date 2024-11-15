import { useState } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderService } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import {
  useAuthentication,
  ROLE_DRIVER,
} from "../../../Hooks/useAuthentication";
import { USER_INFO, USER_ID } from "../../../Hooks/constants";
import { Grid2 } from "@mui/material";
import { DriverOrderDetails } from "./DriverOrderDetails";
import { Order } from "models";

export const DriverDashboardOrderList = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const user = useAuthentication(ROLE_DRIVER);
  const { data: orders, isLoading } = useQuery(
    ["getOrdersBySenderId", user?.userInfo?.id],
    () => OrderService.GetOrdersByDriverId(user?.[USER_INFO]?.[USER_ID])
  );

  console.log("data", orders);

  return (
    <Grid2 sx={{ width: "100%" }}>
      {!isLoading && orders ? (
        orders.map((order: Order) => {
          return (
            <Accordion
              key={order.trackingNumber}
              expanded={expanded === order.trackingNumber}
              onChange={handleChange(order.trackingNumber)}
              sx={{
                bgcolor: "#FFFFFF",
                color: "black",
                border: "1px solid rgba(0, 0, 0, .125)",
                boxShadow: 2,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                {" "}
                <LocalShippingOutlinedIcon />
                <Typography pl={2}>
                  <b>Delivery number: </b>
                  {order.trackingNumber}
                </Typography>
              </AccordionSummary>
              <DriverOrderDetails order={order} />
            </Accordion>
          );
        })
      ) : (
        <Typography variant="h4">There are no orders to display.</Typography>
      )}
    </Grid2>
  );
};
