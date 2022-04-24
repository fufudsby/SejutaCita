import React, { memo } from 'react';
import {
  Grid,
  Box,
  Skeleton,
  Stack,
} from '@mui/material';
import { Book as BookType } from 'pages/index';
import BooksItem from 'components/books.item';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  isSkeleton: boolean;
  data?: BookType[];
};

interface PropsItem {
  children: React.ReactElement;
};

const GridItem = memo(
  function GridItem(props: PropsItem) {
    const { children } = props;
    return (
      <Grid item xs={6} sm={4} md={3} lg={2}>
        {children}
      </Grid>
    );
  },
);

const BooksGrid: React.FunctionComponent<Props> = ({ isSkeleton, data }: Props) => {
  const { downMd } = React.useContext(BreakpointsContext);
  return (
    <Grid container spacing={downMd ? 4 : 0}>
      {isSkeleton ? (
        <>
          {[...new Array(12)].map((_v, i) => (
            <GridItem key={i}>
              <Box padding={downMd ? 0 : 2}>
                <Stack spacing={1}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={245}
                    sx={{
                      borderRadius: 5,
                    }}
                  />
                  <Skeleton variant="text" />
                </Stack>
              </Box>
            </GridItem>
          ))}
        </>
      ) : (
        <>
          {data.map((v, i) => (
            <GridItem key={i}>
              <BooksItem book={v} />
            </GridItem>
          ))}
        </>
      )}
    </Grid>
  );
};

BooksGrid.defaultProps = {};

export default memo(BooksGrid);