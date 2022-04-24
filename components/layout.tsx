import React, { memo } from 'react';
import {
  Container,
} from '@mui/material';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  children?: React.ReactElement;
};

const Layout: React.FunctionComponent<Props> = ({ children }: Props) => {
  const { downMd, downLg } = React.useContext(BreakpointsContext);
  return (
    <Container
      maxWidth={downLg ? 'md' : 'lg'}
      sx={{
        paddingTop: downMd ? 3 : 5,
        paddingBottom: downMd ? 0 : 5,
      }}
    >
      {children}
    </Container>
  );
};

Layout.defaultProps = {};

export default memo(Layout);