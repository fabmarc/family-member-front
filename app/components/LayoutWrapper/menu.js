import _ from 'lodash';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Link from '@material-ui/core/Link';

const menuItems = [
  {
    label: 'Members',
    path: '/members',
    icon: <DashboardIcon />,
  },
  {
    label: 'Orders',
    path: '/orders',
    icon: <ShoppingCartIcon />,
  },
  {
    label: 'Customers',
    path: '/customers',
    icon: <PeopleIcon />,
  },
  {
    label: 'Reports',
    path: '/reports',
    icon: <BarChartIcon />,
  },
  {
    label: 'Integrations',
    path: '/integrations',
    icon: <LayersIcon />,
  },
];

const Menu = ({ history }) => (
  <List>
    {_.map(menuItems, item => (
      <Link key={item.label} color="inherit" href={item.path}>
        <ListItem button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      </Link>
    ))}
  </List>
);

Menu.propTypes = {
  history: PropTypes.object,
};

export default memo(withRouter(Menu));
