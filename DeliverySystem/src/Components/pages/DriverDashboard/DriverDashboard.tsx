import { Grid2, Typography } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground";
import {
  useAuthentication,
  ROLE_DRIVER,
} from "../../../Hooks/useAuthentication";
import { BACKGROUND_RIGHT, IMAGE3 } from "../../../constants";
import { DriverDashboardOrderList } from "./DriverDashboardOrderList";

export const DriverDashboard = () => {
  useBodyBackground({
    backgroundImage: IMAGE3,
    backgroundPosition: BACKGROUND_RIGHT,
    backgroundSize: "cover",
  });

  const driver = useAuthentication(ROLE_DRIVER);

  return (
    <Grid2
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h2" color="white" align="center">
        {`${driver?.userInfo?.firstName} ${driver?.userInfo?.lastName}'s`}{" "}
        <br />
        Assigned Deliveries
      </Typography>
      <Grid2 container justifyContent="center" sx={{ width: "55rem", mt: 4 }}>
        <DriverDashboardOrderList />
      </Grid2>
    </Grid2>
  );
};
