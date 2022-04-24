import React, { memo } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Grid,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import _ from 'lodash';
import { styled } from '@mui/material/styles';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';
import { Book as BookType } from 'pages/index';
import ButtonBookmark from 'components/button.bookmark';
import { BookmarkContext } from 'contexts/bookmark';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  book: BookType;
  open: boolean;
  onClose: () => any;
};

const BoxStyled = styled(Box)(() => ({
  '& .MuiAccordion-rounded.Mui-expanded:before': {
    opacity: 1,
  },
}));

export const TitleIcon = memo(
  function TitleIcon(props: any) {
    const { text, icon } = props;
    return (
      <Box
        display="flex"
        alignItems="center"
        marginRight={3}
        sx={{
          '& svg': {
            width: 20,
            height: 20,
          },      
        }}
      >
        {icon}
        <Typography marginLeft={1} variant="subtitle2">
          {text}
        </Typography>
      </Box>
    );
  },
);

const DialogBooks: React.FunctionComponent<Props> = ({ book, open, onClose }: Props) => {
  const { bookmark } = React.useContext(BookmarkContext);
  const { downSm, downMd } = React.useContext(BreakpointsContext);
  const [ expanded, setExpanded ] = React.useState<string | false>(false);
  const marked = React.useMemo(() => book ? _.includes(bookmark, book.id) : false, [bookmark, open]);
  const handleChange = (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={downSm}
      scroll="body"
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: downSm ? 0 : 4,
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          paddingRight: 2,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            zIndex: 9,
            top: downSm ? 0 : 20,
            right: downSm ? 0 : 20,
            borderRadius: downSm ? 0 : '50%',
            borderBottomLeftRadius: downSm ? 10 : '50%',
            backgroundColor: 'grey.200',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        {book &&
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                '& img': {
                  borderRadius: 3,
                },
                '& .MuiIconButton-root': {
                  marginTop: 1,
                  marginX: 1,
                  top: 0,
                  right: downSm ? 'inherit' : 0,
                  left: downSm ? 0 : 'inherit',
                },
              }}
            >
              <Box position="relative" maxWidth={downMd ? 300 : '100%'} marginX="auto">
                <ButtonBookmark id={book.id} marked={marked} />
                <img src={book.cover_url} width="100%" />
              </Box>
            </Grid>
            <Grid item md={9}>
              <Typography
                variant="h5"
                fontWeight={700}
                paddingRight={5}
              >
                {book.title}
              </Typography>
              <Typography>
                {book.authors.join(', ')}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Box
                display="flex"
                alignItems="center"
              >
                <TitleIcon
                  text={`${book.sections.length} chapters`}
                  icon={<MenuBookIcon />}
                />
                <TitleIcon
                  text={`${Math.floor(book.audio_length / 60)} min`}
                  icon={<AccessTimeIcon />}
                />
              </Box>
              <Divider sx={{ marginY: 1 }} />
              <Typography
                variant="h6"
                fontWeight={700}
                marginBottom={0.5}
              >
                {`What's it about?`}
              </Typography>
              <Typography whiteSpace="pre-line">
                {book.description}
              </Typography>
              <BoxStyled>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  marginBottom={0.5}
                  marginTop={2}
                >
                  {`What's inside?`}
                </Typography>
                {book.sections.map((v, i) => (
                  <Accordion
                    key={i}
                    expanded={expanded == `panel${i}`}
                    onChange={handleChange(`panel${i}`)}
                    elevation={0}
                    defaultExpanded
                    disableGutters
                  >
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography
                      fontWeight={700}
                        sx={{
                          color: 'primary.dark',
                        }}
                      >{v.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        {v.content}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </BoxStyled>
            </Grid>
          </Grid>
        }
      </DialogContent>
    </Dialog>
  );
};

DialogBooks.defaultProps = {};

export default memo(DialogBooks);