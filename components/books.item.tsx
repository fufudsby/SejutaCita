import React, { memo } from 'react';
import {
  Box,
  Typography,
  CardActionArea,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import _ from 'lodash';
import { Book as BookType } from 'pages/index';
import ButtonBookmark from 'components/button.bookmark';
import { DialogContext } from 'contexts/dialog';
import { BookmarkContext } from 'contexts/bookmark';

interface Props {
  book: BookType;
};

const BoxStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  height: '100%',
  position: 'relative',
  '& .MuiIconButton-root': {
    opacity: 0,
    visibility: 'hidden',
    transition: `all 0.1s ease-in-out`,
    '& svg': {
      width: 20,
      height: 20,
    },
  },
  '& .MuiCardActionArea-root': {
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    '& img': {
      margin: 0,
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
    '& .MuiIconButton-root': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0),
    overflow: 'visible',
    '& .MuiIconButton-root': {
      opacity: 1,
      visibility: 'visible',
    },  
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },  
  },
}));

const BooksItem: React.FunctionComponent<Props> = ({ book }: Props) => {
  const { onClick } = React.useContext(DialogContext);
  const { bookmark } = React.useContext(BookmarkContext);
  const authors = React.useMemo(() => book.authors.join(', '), [book]);
  const marked = React.useMemo(() => _.includes(bookmark, book.id), [bookmark]);
  return (
    <BoxStyled>
      <ButtonBookmark id={book.id} marked={marked} />
      <CardActionArea onClick={() => onClick(book.id)}>
        <img src={book.cover_url} width="100%" />
      </CardActionArea>
      <Typography
        fontWeight={700}
        marginY={1}
        lineHeight={1.2}
        onClick={() => onClick(book.id)}
      >
        {book.title}
      </Typography>
      <Typography lineHeight={1.2} variant="subtitle2">
        {authors}
      </Typography>
    </BoxStyled>
  );
};

BooksItem.defaultProps = {};

export default memo(BooksItem);