import React from 'react';

interface Data {
  bookmark: number[];
  onClickBookmark: (id: number) => any;
};

export const BookmarkContext = React.createContext<Data>({
  bookmark: [],
  onClickBookmark: () => null,
});