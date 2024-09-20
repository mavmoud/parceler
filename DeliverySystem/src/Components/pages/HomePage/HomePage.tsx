import { Grid2, Typography } from '@mui/material';
import {useBodyBackground} from "../../../Hooks/useBodyBackground.ts";
import {BACKGROUND_RIGHT, IMAGE3} from "../../../constants.ts";

export const HomePage = () => {
    useBodyBackground({ backgroundImage: IMAGE3, backgroundPosition: BACKGROUND_RIGHT, backgroundSize: 'cover'});
  return (
    <Grid2 mt={1}>
      <Typography p={10} textAlign={'center'} color={'white'}>This is a Homepage</Typography>
    </Grid2>
  );
}
