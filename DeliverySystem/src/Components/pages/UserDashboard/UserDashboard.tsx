import { Grid2, Card, Typography, Button } from "@mui/material";
import { useBodyBackground } from "../../../Hooks/useBodyBackground";
import { useAuthentication, ROLE_USER } from "../../../Hooks/useAuthentication";
import {
  USER_INFO,
  USER_FIRST_NAME,
  USER_LAST_NAME,
} from "../../../Hooks/constants";
import { BACKGROUND_RIGHT, IMAGE3 } from "../../../constants";
import { USER_DASHBOARD_TITLE, USER_ORDER_SECTION_TITLE } from "./constants";
import { UserOrderTable } from "./UserOrderTable";

export const UserDashboard = () => {
  useBodyBackground({
    backgroundImage: IMAGE3,
    backgroundPosition: BACKGROUND_RIGHT,
    backgroundSize: "cover",
  });

  const user = useAuthentication(ROLE_USER);

  return (
    <Grid2>
      <Grid2 container justifyContent="center">
        <Grid2>
          <Typography color="white" variant="h3" p={5}>
            {`${user[USER_INFO][USER_FIRST_NAME]} ${user[USER_INFO][USER_LAST_NAME]} ${USER_DASHBOARD_TITLE}`}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2>
        <UserOrderTable />
      </Grid2>
    </Grid2>
  );
};

{
  /* <Grid2 container sx={{justifyContent: 'center'}}>
            <Typography color="white" variant="h3" p={5}>{`${user[USER_INFO][USER_FIRST_NAME]} ${user[USER_INFO][USER_LAST_NAME]} ${USER_DASHBOARD_TITLE}`}</Typography>
            <Grid2 container sx={{gap: '5rem'}}>
            <Card sx={{minWidth:'40rem', minHeight:'25rem', borderRadius: 10}}>
            <Typography variant='h5' pl={5} pt={3} pb={1}>{USER_ORDER_SECTION_TITLE}</Typography>
            <Grid2 container gap={4}>
                <Grid2>
                    <Card sx={{ml: 4, width: '17rem', height: '7rem', border: '1px solid lightgrey', boxShadow: 3, borderRadius:6}}></Card>
                </Grid2>
                <Grid2>
                
                <Card sx={{ width: '17rem', height: '7rem', border: '1px solid lightgrey', boxShadow: 3, borderRadius:6}}></Card>
                
                </Grid2>
            </Grid2>
            
            <Grid2 container gap={4} pt={2}>
            <Grid2><Card sx={{ml: 4, width: '17rem', height: '7rem', border: '1px solid lightgrey', boxShadow: 3, borderRadius:6}}></Card></Grid2>
            <Grid2><Card sx={{ width: '17rem', height: '7rem', border: '1px solid lightgrey', boxShadow: 3, borderRadius:6}}></Card></Grid2>
            </Grid2>
            <Grid2 pr={3} pl={3} pt={3}>
            <Button sx={{p: 1.5,  backgroundColor: 'black', color: 'white', width: '100%', borderRadius: 5}}>{'Create Order'}</Button>
            </Grid2>
            </Card>
            <Card sx={{minWidth:'20rem', maxHeight:'15rem', borderRadius: 10}}>
            </Card>
        </Grid2>
        
        </Grid2> */
}
