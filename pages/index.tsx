import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import _ from 'lodash';
import Layout from 'components/layout';
import Categories from 'components/categories';
import CategoriesBooks from 'components/categories.books';
import DialogBooks from 'components/dialog';
import { getCategories } from 'utils/services/category';
import { getBooks } from 'utils/services/book';
import { DialogContext } from 'contexts/dialog';

export interface Category {
  id: number;
  name: string;
  books?: Book[];
};

export interface Sections {
  title: string;
  content: string;
};

export interface Book {
  id: number;
  title: string;
  category_id: number;
  authors: string[];
  cover_url: string;
  description: string;
  sections: Sections[];
  audio_length: number;
};

interface Props {
  categories: Category[];
  categoriesBooks: Category[];
};

const Home: NextPage<Props> = ({ categories, categoriesBooks }: Props) => {
  console.log('categoriesBooks', categoriesBooks);
  const [ open, setOpen ] = React.useState(false);
  const [ dataOpen, setDataOpen ] = React.useState<Book>(null);
  const handleClick = React.useCallback((id: number) => {
    const getData: any = _.compact(_.map(categoriesBooks, (obj) => _.find(obj.books, { id })));
    setOpen(true);
    setDataOpen(getData.length > 0 ? getData[0] : null);
  }, [categoriesBooks]);
  return (
    <React.Fragment>
      <Head>
        <title>Sejuta Cita</title>
        <meta name="description" content="Sejuta Cita" />
      </Head>
      <Layout>
        <>
          <Categories categories={categories} />
          <DialogContext.Provider
            value={{
              open,
              onClick: handleClick,
            }}
          >
            {categoriesBooks.map((v, i) => (
              <CategoriesBooks key={i} category={v} />
            ))}
          </DialogContext.Provider>
          <DialogBooks book={dataOpen} open={open} onClose={() => setOpen(false)} />
        </>
      </Layout>
    </React.Fragment>
  );
};

export const getServerSideProps = async () => {
  const categories: Category[] = await getCategories();
  let categoriesBooks: any = _.cloneDeep(categories);
  if (categoriesBooks.length > 0) {
    await Promise.all(
      categoriesBooks.map(async (v: any, i: number) => {
        const books = await getBooks(v.id);
        categoriesBooks[i]['books'] = books;
      }),
    );
  };
  return {
    props: {
      categories,
      categoriesBooks,
    },
  };
};

export default Home;
