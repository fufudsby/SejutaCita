import React, { memo } from 'react';
import {
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from 'next/link';
import _ from 'lodash';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  text: string;
  id?: number;
  marginBottom?: number;
  withBack?: boolean;
  onBack?: () => any;
};

const Title: React.FunctionComponent<Props> = ({ text, id, marginBottom, withBack, onBack }: Props) => {
  const router = useRouter();
  const { downSm, downMd, downLg } = React.useContext(BreakpointsContext);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      marginBottom={marginBottom}
    >
      <Box
        display="flex"
        alignItems="center"
      >
        {withBack &&
          <IconButton
            onClick={onBack ? onBack : () => router.back()}
            sx={{
              marginRight: 1.5,
              padding: 0.4,
              backgroundColor: 'grey.200',
              '& svg': {
                width: 30,
                height: 30,
              },
              '&:hover': {
                backgroundColor: 'grey.300',
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        }
        <Typography
          fontSize={downSm ? 18 : downMd ? 20 : downLg ? 22 : 24}
          fontWeight={700}
          lineHeight={1.2}
        >
          {text}
        </Typography>
      </Box>
      {id &&
        <Link href={`/books/${id}/${_.kebabCase(text)}`} passHref>
          <Button
            component="a"
            variant="contained"
            disableElevation
            size="small"
            sx={{
              borderRadius: 25,
              paddingX: 2.5,
              paddingY: 0.7,
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              marginLeft: 2,
            }}
          >
            {`View All`}
          </Button>
        </Link>
      }
    </Box>
  );
};

Title.defaultProps = {
  marginBottom: 0,
  withBack: false,
};

export default memo(Title);