import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import _ from 'lodash';
import { ReasonPhrases } from 'http-status-codes';
import { useRouter } from 'next/router';
import Layout from 'components/layout';
import Title from 'components/title';
import BooksGrid from 'components/books.grid';
import Pagination from 'components/pagination';
import Search from 'components/search';
import DialogBooks from 'components/dialog';
import { getCategories } from 'utils/services/category';
import { Category } from 'pages/index';
import { DialogContext } from 'contexts/dialog';
import { Book as BookType } from 'pages/index';
import { BreakpointsContext } from 'contexts/breakpoints';

interface Props {
  category: string;
};

const Books: NextPage<Props> = ({ category }: Props) => {
  const router = useRouter();
  const { downSm, downMd } = React.useContext(BreakpointsContext);
  const [ source, setSource ] = React.useState([]);
  const [ data, setData ] = React.useState([]);
  const [ loading, setLoading ] = React.useState(true);
  const [ isLast, setIsLast ] = React.useState(false);
  const [ open, setOpen ] = React.useState(false);
  const [ dataOpen, setDataOpen ] = React.useState<BookType>(null);
  const [ page, setPage ] = React.useState(router.query.page ? parseInt(router.query.page as string) : 1);
  const { categoryId } = router.query;
  const getData = async (pageParams: number) => {
    setLoading(true);
    const sp = pageParams - 1;
    const pg = !pageParams || (sp) < 0 ? 0 : sp;
    const fetchData = await fetch(`/api/book/${categoryId}/?page=${pg}`, { method: 'GET' });
    const results = await fetchData.json();
    console.log('results', results);
    if (results.message == ReasonPhrases.OK) {
      if (results.data.length > 0) {
        setData(results.data);
        setSource(results.data);
        setPage(pageParams);
        if (results.data.length < 12) {
          setIsLast(true);
        } else {
          setIsLast(false);
        };
      } else {
        setIsLast(true);
      };
    };
    setLoading(false);
  };
  React.useEffect(() => {
    getData(parseInt(router.query.page as string));
  }, [router.query.page, isLast]);
  const handleNextPrev = React.useCallback((page: number) => {
    const pg = page < 1 ? 1 : page;
    router.push(
      `/books/[categoryId]/[slug]/?page=${pg}`,
      `/books/${categoryId}/${_.kebabCase(category)}/?page=${pg}`,
      { shallow: true },
      );
  }, [categoryId]);
  const handleClick = React.useCallback((id: number) => {
    const getData = _.find(data, { id });
    setOpen(true);
    setDataOpen(getData);
  }, [data]);
  return (
    <React.Fragment>
      <Head>
        <title>Sejuta Cita</title>
        <meta name="description" content="Sejuta Cita" />
      </Head>
      <Layout>
        <>
          <Box
            display={downSm ? 'block' : 'flex'}
            alignItems="center"
            justifyContent="space-between"
            marginBottom={4}
          >
            <Title
              text={category}
              withBack={true}
              onBack={() => router.push(`/`, `/`)}
            />
            <Search data={source} setData={setData} />
          </Box>
          {data.length > 0 && !loading ? (
            <DialogContext.Provider
              value={{
                open,
                onClick: handleClick,
              }}
            >
              <BooksGrid data={data} isSkeleton={false} />
            </DialogContext.Provider>
          ) : (
            <>
            {loading ? (
              <BooksGrid isSkeleton={true} />
            ) : (
              <Typography
                textAlign="center"
                paddingY={5}
                sx={{
                  color: 'grey.400',
                }}
              >
                {`Data not found`}
              </Typography>
            )}
            </>
          )}
          <Box marginBottom={downMd ? 3 : 0}>
            <Pagination current={page} isLast={isLast} clickNextPrev={handleNextPrev} />
          </Box>
          <DialogBooks book={dataOpen} open={open} onClose={() => setOpen(false)} />
        </>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { categoryId } = query;
  const categories: Category[] = await getCategories();
  const category = _.find(categories, { 'id': parseInt(categoryId) });
  return {
    props: {
      category: category ? category.name : '',
    },
  };
};

export default Books;