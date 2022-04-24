import React from 'react';

interface Data {
  downSm: boolean;
  downMd: boolean;
  downLg: boolean;
};

export const BreakpointsContext = React.createContext<Data>({
  downSm: false,
  downMd: false,
  downLg: false,
});
