import React, { memo } from 'react';
import {
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { BookmarkContext } from 'contexts/bookmark';
import _ from 'lodash';

interface Props {
  id: number;
  marked: boolean;
};

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  zIndex: 9,
  top: theme.spacing(3),
  right: theme.spacing(3),
  padding: theme.spacing(0.7),
  background: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.grey[50],
  },
  [theme.breakpoints.down('md')]: {
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

const ButtonBookmark: React.FunctionComponent<Props> = ({ id, marked }: Props) => {
  const { onClickBookmark } = React.useContext(BookmarkContext);
  return (
    <IconButtonStyled onClick={() => onClickBookmark(id)}>
      <BookmarkIcon
        sx={{
          color: marked ? 'warning.light' : 'grey.800',
        }}
      />
    </IconButtonStyled>
  );
};

ButtonBookmark.defaultProps = {};

export default memo(ButtonBookmark);