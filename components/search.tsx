import React, { memo } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';
import { Book as BookType } from 'pages/index';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  data: BookType[];
  setData: (data: BookType[]) => any;
};

function filteredData(data: any, search: string) {
  return data.filter((data: any) => {
    return Object.values(data).some(v => {
      return String(v).toLowerCase().includes(search);
    });
  });
};

const Search: React.FunctionComponent<Props> = ({ data, setData }: Props) => {
  const input: any = React.useRef();
  const { downSm, downMd } = React.useContext(BreakpointsContext);
  const handleSubmit = React.useCallback(() => {
    const val = input.current.value;
    const clone: any = _.cloneDeep(data.map((v) => _.pick(v, ['title', 'authors'])));
    const filtered = filteredData(clone, val.toLocaleLowerCase().trim());
    let dataFilter = [];
    filtered.map((v: any) => {
      const d = _.find(data, { 'title': v.title });
      dataFilter.push(d);
    });
    setData(dataFilter);
  }, [data, input]);
  return (
    <Paper
      elevation={0}
      sx={{
        paddingY: 0.3,
        paddingX: 2,
        marginTop: downSm ? 3 : 0,
        marginLeft: downSm ? 0 : 3,
        display: 'flex',
        alignItems: 'center',
        maxWidth: downSm ? 'inherit' : 400,
        width: downSm ? '100%' : downMd ? '50%' : '40%',
        backgroundColor: 'grey.200',
        borderRadius: 25,
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
        }}
        inputRef={input}
        onKeyPress={(e) => {
          if (e.key == 'Enter') {
            handleSubmit();
            e.preventDefault();
          }
        }}
        placeholder="Search books or authors"
      />
      <IconButton
        disableRipple
        onClick={handleSubmit}
        sx={{
          '& svg': {
            transition: `all 0.2s ease-in-out`,
            color: 'grey.400',
          },
          '&:hover': {
            '& svg': {
              color: 'grey.500',
            },
          },
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

Search.defaultProps = {};

export default memo(Search);