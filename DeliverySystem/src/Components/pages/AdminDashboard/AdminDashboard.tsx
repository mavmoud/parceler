import { Grid2, Typography } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground";
import {
  useAuthentication,
  ROLE_ADMIN,
} from "../../../Hooks/useAuthentication";
import {
  BACKGROUND_RIGHT,
  BACKGROUND_BOTTOM,
  IMAGE3,
} from "../../../constants";

export const AdminDashboard = () => {
  useBodyBackground({
    backgroundImage: IMAGE3,
    backgroundPosition: BACKGROUND_RIGHT,
    backgroundSize: "cover",
  });

  const userInfo = useAuthentication(ROLE_ADMIN);

  return (
    <Grid2>
      <Typography variant="h1" color="white">
        ADMIN DASHBOARD
      </Typography>
    </Grid2>
  );
};
