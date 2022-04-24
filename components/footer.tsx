import React, { memo } from 'react';
import {
  Typography,
  Container,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { BreakpointsContext } from 'contexts/breakpoints';

const Footer: React.FunctionComponent = () => {
  const { downSm } = React.useContext(BreakpointsContext);
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: downSm ? 'column' : 'row',
        alignItems:'center',
        justifyContent: downSm ? 'center' : 'space-between',
        paddingY: 3,
        marginTop: 2,
        backgroundColor: 'grey.200',
      }}
    >
      <img src="/images/logo.png" width={80} />
      <Typography
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={downSm ? 1 : 0}
        sx={{
          '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
            marginX: 0.5,
            color: red[800],
          },
        }}
      >
        {`Made with`}
        <FavoriteIcon />
        {`by SejutaCita Community`}
      </Typography>
    </Container>
  );
};

Footer.defaultProps = {};

export default memo(Footer);