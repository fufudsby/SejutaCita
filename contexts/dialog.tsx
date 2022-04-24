import React from 'react';

interface Data {
  open: boolean;
  onClick: (id: number) => any;
};

export const DialogContext = React.createContext<Data>({
  open: false,
  onClick: () => null,
});
