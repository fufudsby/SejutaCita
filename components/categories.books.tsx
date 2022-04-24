import React, { memo } from 'react';
import {
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Category as CategoryType } from 'pages/index';
import BooksItem from 'components/books.item';
import Title from 'components/title';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  category: CategoryType;
};

const gutter = 3;
export const BoxStyled = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  '& .slick-slider': {
    position: 'relative',
    margin: theme.spacing(0),
    '& .slick-list': {
      overflow: 'hidden',
      '& .slick-track': {
        display: 'flex',
        overflow: 'hidden',
        '& .items': {
          padding: theme.spacing(0),
        },
      },
    },
    '& .slick-arrow': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      position: 'absolute',
      top: '50%',
      zIndex: 9,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(0.5),
      borderRadius: '50%',
      cursor: 'pointer',
      '& .MuiSvgIcon-root': {
        width: theme.spacing(4),
        height: theme.spacing(4),
      },
    },
  },
  [theme.breakpoints.down('md')]: {
    '& .slick-slider': {
      margin: theme.spacing(0, -1.5),
      '& .slick-list': {
        '& .slick-track': {
          '& .items': {
            padding: theme.spacing(0, 1.5),
          },
        },
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .slick-slider': {
      margin: theme.spacing(0, -1),
      '& .slick-list': {
        '& .slick-track': {
          '& .items': {
            padding: theme.spacing(0, 1),
          },
        },
      },
    },
  },
}));

const StyledBoxArrow = styled(Box)(({ theme }) => ({
  '&.slick-next, &.next': {
    right: theme.spacing(gutter),
    transform: `translate(0, -${theme.spacing(gutter * 2)})`,
  },
  '&.slick-prev, &.prev': {
    left: theme.spacing(gutter),
    transform: `translate(0, -${theme.spacing(gutter * 2)}) rotate(180deg)`,
  },
  '&.slick-next, &.next, &.slick-prev, &.prev': {
    '&.slick-disabled, &.disabled': {
      opacity: 0.5,
      backgroundColor: theme.palette.grey[600],
    },
  },
}));

export const Arrow = memo(
  function Arrow(props: any) {
    const { className, onClick } = props;
    return (
      <StyledBoxArrow className={className} onClick={onClick}>
        <ArrowForwardIcon />
      </StyledBoxArrow>
    );
  },
);

const CategoriesBooks: React.FunctionComponent<Props> = ({ category }: Props) => {
  const { downSm } = React.useContext(BreakpointsContext);
  const settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <Arrow size={(40).toString()} />,
    prevArrow: <Arrow size={(40).toString()} />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          nextArrow: <></>,
          prevArrow: <></>,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          nextArrow: <></>,
          prevArrow: <></>,
        }
      },

    ],
  };
  return (
    <Box marginBottom={downSm ? 5 : 2}>
      <Title text={category.name} id={category.id} marginBottom={2} />
      <BoxStyled>
        <Slider {...settings}>
          {category.books.map((v, i) => (
            <Box key={i} className="items">
              <BooksItem key={i} book={v} />
            </Box>
          ))}
        </Slider>
      </BoxStyled>
    </Box>
  );
};

CategoriesBooks.defaultProps = {};

export default memo(CategoriesBooks);