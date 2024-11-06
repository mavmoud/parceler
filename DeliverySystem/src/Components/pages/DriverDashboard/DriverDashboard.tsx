import { Grid2, Typography } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground";
import {
  useAuthentication,
  ROLE_DRIVER,
} from "../../../Hooks/useAuthentication";
import {
  BACKGROUND_RIGHT,
  BACKGROUND_BOTTOM,
  IMAGE3,
} from "../../../constants";

export const DriverDashboard = () => {
  useBodyBackground({
    backgroundImage: IMAGE3,
    backgroundPosition: BACKGROUND_RIGHT,
    backgroundSize: "cover",
  });

  const userInfo = useAuthentication(ROLE_DRIVER);

  return (
    <Grid2>
      <Typography variant="h1" color="white">
        DRIVER DASHBOARD
      </Typography>
    </Grid2>
  );
};
