import React, { memo } from 'react';
import {
  Box,
  Typography,
  Chip,
} from '@mui/material';
import Link from 'next/link';
import { Category as CategoryType } from 'pages/index';
import _ from 'lodash';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  categories: CategoryType[];
};

const Categories: React.FunctionComponent<Props> = ({ categories }: Props) => {
  const { downSm } = React.useContext(BreakpointsContext);
  return (
    <Box marginBottom={downSm ? 3 : 5} overflow="hidden">
      <Typography
        fontSize={downSm ? 18 : 20}
        fontWeight={700}
        marginBottom={2}
      >
        {`Explore Categories`}
      </Typography>
      <Box display="flex" flexWrap="wrap" marginX={-0.5}>
        {categories.map((v, i) => (
          <Link href={`/books/${v.id}/${_.kebabCase(v.name)}`} passHref key={i}>
            <Chip
              label={v.name}
              component="a"
              clickable
              sx={{
                margin: 0.5,
              }}
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

Categories.defaultProps = {};

export default memo(Categories);