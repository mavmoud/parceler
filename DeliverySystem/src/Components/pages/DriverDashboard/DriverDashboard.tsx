import { Box, Grid2 } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground";
import {
  useAuthentication,
  ROLE_DRIVER,
} from "../../../Hooks/useAuthentication";
import {BACKGROUND_BOTTOM, IMAGE2} from "../../../constants";
import { DriverDashboardOrderList } from "./DriverDashboardOrderList";
import { PageTitle } from "../../PageTitle.tsx";

export const DriverDashboard = () => {
    useBodyBackground({
        backgroundImage: IMAGE2,
        backgroundPosition: BACKGROUND_BOTTOM,
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
      <PageTitle
        title={`${driver?.userInfo?.firstName}'s Assigned Deliveries`}
      />
      <Grid2 container justifyContent="center" sx={{ width: "900px" }}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "70px",
            height: "400px",
            overflowY: "auto",
            width: "900px",
          }}
        >
          <DriverDashboardOrderList />
        </Box>
      </Grid2>
    </Grid2>
  );
};
