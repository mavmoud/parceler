import React, { useEffect, useState } from "react";
import { useBodyBackground } from "../../../Hooks/useBodyBackground.ts";
import { BACKGROUND_RIGHT, IMAGE3 } from "../../../constants.ts";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { OrderService } from "../../../services/OrderService";
import { MdOutlineLocationOff, MdOutlineWrongLocation } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { TbWeight } from "react-icons/tb";
import { LuPackagePlus } from "react-icons/lu";
import { LuPackage2 } from "react-icons/lu";
import { TbPackageExport } from "react-icons/tb";
import { LuPackageOpen } from "react-icons/lu";
import { TbTruckReturn } from "react-icons/tb";
import { MdOutlineNewReleases } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";

interface Order {
  senderAddress: string;
  recipientAddress: string;
  packageWeight: number;
  latestStatusName: string;
}

interface statusHistory {
  createdAt: string;
  packagePickedUp: string;
  packageInTransit: string;
  outForDelivery: string;
  packageDelivered: string;
  estimatedDelivery: string;
}

interface OrderData {
  order: Order;
  statusHistory: statusHistory;
}

export const iconMap = new Map([
  ["Shipment Created", () => <LuPackagePlus color="black" size={24} />],
  ["Picked Up", () => <LuPackage2 color="black" size={24} />],
  ["In Transit", () => <TbPackageExport color="black" size={24} />],
  ["Out for Delivery", () => <GrDeliver color="black" size={24} />],
  ["Delivered", () => <LuPackageOpen color="black" size={24} />],
  [
    "Delivery Attempted",
    () => <MdOutlineNewReleases color="black" size={24} />,
  ],
  ["Returned to Sender", () => <TbTruckReturn color="black" size={24} />],
]);

export const Track = () => {
  useBodyBackground({
    backgroundImage: IMAGE3,
    backgroundPosition: BACKGROUND_RIGHT,
    backgroundSize: "cover",
  });

  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const validTrackingNumber = trackingNumber || "";

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const data = await OrderService.GetOrderByTrackingNumber(
          validTrackingNumber
        );
        console.log(data);
        setOrderData(data);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrderData();
  }, [trackingNumber]);

  let EstimatedDelivery = "";

  if (orderData?.order?.latestStatusName === "Delivered") {
    EstimatedDelivery = "arrived";
  } else if (orderData?.order?.latestStatusName === "Out for Delivery") {
    EstimatedDelivery = "1 day";
  } else if (orderData?.order?.latestStatusName === "In Transit") {
    EstimatedDelivery = "2-3 days";
  } else if (orderData?.order?.latestStatusName === "In Transit") {
    EstimatedDelivery = "3-5 days";
  } else if (orderData?.order?.latestStatusName === "Picked Up") {
    EstimatedDelivery = "5-6 days";
  } else if (orderData?.order?.latestStatusName === "Shipment Created") {
    EstimatedDelivery = "6-10 days";
  } else {
    EstimatedDelivery = "N/A";
  }

  const trackingStatus = orderData?.statusHistory;
  console.log("test", trackingStatus);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "80vh", paddingTop: "10vh" }}
    >
      <Card
        sx={{
          maxWidth: 1000,
          padding: "20px",
          borderRadius: "15px",
          display: "flex",
        }}
      >
        {/* Left section */}
        <CardContent sx={{ width: "50%" }}>
          <Card
            sx={{
              maxWidth: 500,
              padding: "5px 10px",
              borderRadius: "20px",
              backgroundColor: "#0d1b2a",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              color="white"
              sx={{ fontSize: "14px" }}
            >
              Tracking Number: {trackingNumber}
            </Typography>
          </Card>

          <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: 2 }}>
            {orderData?.order?.latestStatusName ?? "N/A"}
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 3 }}>
            <Grid item xs={6}>
              <Grid container alignItems="center">
                <MdOutlineLocationOff />
                <Typography pl={1}>Origin</Typography>
              </Grid>
              <Typography variant="body1">
                {orderData?.order?.senderAddress ?? "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <MdOutlineWrongLocation />
                <Typography pl={1}>Destination</Typography>
              </Grid>
              <Typography variant="body1">
                {orderData?.order?.recipientAddress ?? "N/A"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                {/*<CiDeliveryTruck />*/}
                <Typography pl={0.7}>Estimated Delivery</Typography>
              </Grid>
              <Typography variant="body1">{EstimatedDelivery}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Grid container alignItems="center">
                <TbWeight />
                <Typography pl={1}>Weight</Typography>
              </Grid>
              <Typography variant="body1">
                {orderData?.order?.packageWeight ?? "N/A"} kg
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        {/* Right section - Tracking Progress inside a rounded card */}
        <CardContent
          sx={{ width: "50%", display: "flex", justifyContent: "center" }}
        >
          <Card
            sx={{
              padding: "15px",
              borderRadius: "15px",
              backgroundColor: "#f9f9f9", // Light background color for the inner card
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              width: "90%", // Slight padding on sides within the main card
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Tracking Progress
            </Typography>
            <Divider sx={{ my: 1 }} />

            {trackingStatus && (
              <Grid container direction="column" spacing={2}>
                {trackingStatus?.map((el) => {
                  return (
                    <Grid item key={el.id} container alignItems="center">
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",

                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "12px",
                        }}
                      >
                        <span style={{ color: "blue", fontSize: "20px" }}>
                          {iconMap.get(el.statusName)?.()}
                        </span>
                      </div>
                      <div>
                        <Typography variant="subtitle1">
                          {el.statusName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {el.createdAt}
                        </Typography>
                      </div>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Card>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Track;
