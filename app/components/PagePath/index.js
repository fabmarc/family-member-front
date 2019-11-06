import _ from 'lodash';
import React, { memo } from 'react';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme =>({
  breadcrumbs: {
    marginBottom: theme.spacing(2),
  },
}));

export function PagePath({ pages, header }) {
  const classes = useStyles();
  return (
    <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
      {_.map(pages, page => (
        <Link key={page.label} color="inherit" href={page.to}>
          {page.label}
        </Link>
      ))}
      <Typography color="textPrimary">
        {header}
      </Typography>
    </Breadcrumbs>
  );
}

export default memo(PagePath);
