import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import {
  Box,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from 'styles/theme';
import _ from 'lodash';
import createEmotionCache from 'styles/createEmotionCache';
import Footer from 'components/footer';
import { BreakpointsContext } from 'contexts/breakpoints';
import { BookmarkContext } from 'contexts/bookmark';
import useMediaQuery from '@mui/material/useMediaQuery';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
};

export default function MyApp(props: MyAppProps) {
  const [ bookmark, setBookmark ] = React.useState([]);
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));
  const handleBookmark = React.useCallback((id: number) => {
    const isRemove = _.includes(bookmark, id);
    let data: any;
    if (isRemove) {
      data = _.remove(bookmark, (n) => n != id);
    } else {
      data = [...bookmark, id];
    };
    setBookmark(data);
    localStorage.setItem('bookmark', JSON.stringify(data));
  }, [bookmark]);
  React.useEffect(() => {
    const bookmarkStorage = JSON.parse(localStorage.getItem('bookmark'));
    const bookmarkArray = bookmarkStorage ? bookmarkStorage : [];
    setBookmark(bookmarkArray);
  }, []);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Sejuta Cita</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BreakpointsContext.Provider
          value={{
            downSm,
            downMd,
            downLg,
          }}
        >
          <BookmarkContext.Provider
            value={{
              bookmark,
              onClickBookmark: handleBookmark,
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              minHeight="calc(100vh - 56px)"
            >
              <Component {...pageProps} />
            </Box>
            <Footer />
          </BookmarkContext.Provider>
        </BreakpointsContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};