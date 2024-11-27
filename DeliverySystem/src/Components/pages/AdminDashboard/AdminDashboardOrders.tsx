import { Grid2, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { OrderService } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import {
  useAuthentication,
  ROLE_ADMIN,
} from "../../../Hooks/useAuthentication";
import { ORDER_TRACKING_NUMBER } from "./constant";
import { AdminCustomCard } from "./AdminCustomCard";
import "./adminDashboard.css";

export const AdminDashboardOrders = () => {
  const user = useAuthentication(ROLE_ADMIN);
  const { data: orders, isLoading } = useQuery(
    ["orders", user?.userInfo?.id],
    () => OrderService.GetAllOrders()
  );

  return (
    <Grid2 className="container-content">
      {!isLoading &&
        orders &&
        orders?.map((order: object, index: number) => {
          const trackingNumber = order?.[ORDER_TRACKING_NUMBER];
          return (
            <Accordion key={trackingNumber} className="container-accordion">
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{`Order ${++index}: ${trackingNumber}`}</Typography>
              </AccordionSummary>
              <AccordionDetails className="container-accordion-details">
                <Grid2 container>
                  <AdminCustomCard
                    title={"Recipient"}
                    first={`First name: ${order.recipientFirstName}`}
                    second={`Last name ${order.recipientLastName}`}
                    third={`Address: ${order.recipientAddress}`}
                  />
                  <AdminCustomCard
                    title={"Sender"}
                    first={`First name: ${order.senderFirstName}`}
                    second={`Last name ${order.senderLastName}`}
                    third={`Contact: ${order.senderPhoneNumber}`}
                  />
                  <AdminCustomCard
                    title={"Order details"}
                    first={`Weight: ${order.packageWeight} kg`}
                    second={`Dimensions: ${order.packageDimension}`}
                    third={`Cost: ${order.amount} ${order.currency}`}
                  />
                </Grid2>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Grid2>
  );
};
