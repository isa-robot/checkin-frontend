import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineLineChart } from 'react-icons/ai';

import { Container, Menu } from './styles';

export default function Header() {
  return (
    <Container>
      <Menu>
        <div>
          <p>MENU</p>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink
                activeStyle={{ color: '#383A3D', fontWeight: 'bold' }}
                to="/dashboard"
              >
                <AiOutlineLineChart size={24} />
                DASHBOARD
              </NavLink>
            </li>
            <li>
              <NavLink
                activeStyle={{ color: '#383A3D', fontWeight: 'bold' }}
                to="/lala"
              >
                <AiOutlineLineChart size={24} />
                DASHBOARD
              </NavLink>
            </li>
          </ul>
        </nav>
      </Menu>
    </Container>
  );
}
