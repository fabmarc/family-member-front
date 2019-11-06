import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

const fieldsPerRow = 4;

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    paddingTop: theme.spacing(0),
  },
  cardActions: {
    float: 'right',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: `calc(100% / ${fieldsPerRow} - ${theme.spacing(2)}px)`,
  },
}));

export function Filter({ fields, onSearch }) {
  const classes = useStyles();
  return (
    <Card elevation={3} className={classes.card}>
      <CardHeader subheader="Filter" />
      <CardContent className={classes.cardContent}>
        {fields &&
          fields.map(field => (
            <TextField
              key={field.id}
              label={field.label}
              type="search"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          ))}
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onSearch}
        >
          <SearchIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

Filter.propTypes = {
  fields: PropTypes.array,
  onSearch: PropTypes.func,
};

export default memo(Filter);
