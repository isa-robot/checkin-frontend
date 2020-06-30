import React from 'react';

import { BasicList } from './styles';

export default function List({ children, ...rest }) {
  return <BasicList {...rest}>{children}</BasicList>;
}
