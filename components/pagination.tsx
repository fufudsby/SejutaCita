import React, { memo } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { BoxStyled, Arrow } from 'components/categories.books';

interface Props {
  current: number;
  isLast: boolean;
  clickNextPrev?(page: number): any;
};

export const StyledBoxInner = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .slick-arrow': {
    position: 'relative !important',
    '&.slick-next, &.next': {
      transform: `translate(100%, 0) !important`,
    },
    '&.slick-prev, &.prev': {
      transform: `translate(-100%, 0) rotate(180deg) !important`,
    },
  },
}));

const Pagination: React.FunctionComponent<Props> = ({
  current,
  isLast,
  clickNextPrev,
}: Props) => {
  console.log('current', current);
  
  const handleClick = React.useCallback((isNext: boolean, disabled: boolean) => {
    if (disabled) {
      return;
    };    
    clickNextPrev(isNext ? (current ? current : 1) + 1 : current - 1);
  }, [current]);
  return (
    <BoxStyled marginTop={6}>
      <StyledBoxInner className="slick-slider">
        <Arrow
          size={(40).toString()}
          className={`slick-arrow prev ${current == 1 || !current ? 'disabled' : ''}`}
          onClick={() => handleClick(false, current == 1 || !current)}
        />
        <Typography>
          {`Page ${current ? current : 1}`}
        </Typography>
        <Arrow
          size={(40).toString()}
          className={`slick-arrow next ${isLast ? 'disabled' : ''}`}
          onClick={() => handleClick(true, isLast)}
        />
      </StyledBoxInner>
    </BoxStyled>
  );
};

Pagination.defaultProps = {};

export default memo(Pagination);