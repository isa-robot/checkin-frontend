import React from 'react';
import { FaClipboardCheck, FaBinoculars, FaTasks, FaHome } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function Icon({ type }) {
  switch (type) {
    case 'diary':
      return <FaClipboardCheck size="2.3rem" />;
    case 'monitoring':
      return <FaBinoculars size="2.3rem" />;
    case 'jobs':
      return <FaTasks size="2.3rem" />;
    default:
      return <FaHome size="2.3rem" />;
  }
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
};
