import { Grid2, Card, Typography, Button } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground";
import { useAuthentication, ROLE_USER } from "../../../Hooks/useAuthentication";
import {
  USER_INFO,
  USER_FIRST_NAME,
  USER_LAST_NAME,
} from "../../../Hooks/constants";
import { BACKGROUND_RIGHT, IMAGE3, QUOTE_URL } from "../../../constants";
import { USER_DASHBOARD_TITLE,} from "./constants";
import { UserOrderTable } from "./UserOrderTable";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useNavigate } from "react-router-dom";

export const UserDashboard = () => {
  useBodyBackground({
    backgroundImage: IMAGE3,
    backgroundPosition: BACKGROUND_RIGHT,
    backgroundSize: "cover",
  });
  const navigate = useNavigate();
  const user = useAuthentication(ROLE_USER);
  
  return (
      <Grid2 xs={12} md={7}>
        <Grid2 container direction="column" alignItems="center">
          <Grid2>
            <Typography color="white" variant="h3" p={5}>
              {`${user?.[USER_INFO]?.[USER_FIRST_NAME]} ${user?.[USER_INFO]?.[USER_LAST_NAME]} ${USER_DASHBOARD_TITLE}`}
            </Typography>
          </Grid2>
          <Grid2 pb={3}>
          <Grid2 p={1}>
          <Typography>
            <Button
              variant="outlined"
              sx={{color: 'white', gap: '0.5rem', borderColor:'white'}}
              onClick={() => navigate(QUOTE_URL)}
            > 
            <LocalShippingOutlinedIcon /><Typography>Create order</Typography></Button>
          </Typography>
          </Grid2>
      </Grid2>
          <Grid2 minWidth={'75rem'}>
            <UserOrderTable />
          </Grid2>
        </Grid2>
      </Grid2>
  );
};


