import React, { memo } from 'react';
import {
  Box,
} from '@mui/material';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  load: boolean;
};

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: 9999,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
}));

const Loading: React.FunctionComponent<Props> = ({ load }) => {
  const { downMd } = React.useContext(BreakpointsContext);
  return (
    <React.Fragment>
      <Fade
        in={load}
        timeout={{ enter: 0, exit: 500 }}
      >
        <StyledBox
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box position="relative" width="100%" height={downMd ? 50 : 80}>
            <Image
              src={`/images/logo.png`}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </StyledBox>
      </Fade>
    </React.Fragment>
  );
};

export default memo(Loading);
