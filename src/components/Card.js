import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  card: {
    padding: 25,
    borderRadius: 4,
    backgroundColor: '#fff',
    boxShadow: '0px 0px 13px 0px rgba(82, 63, 105, 0.05)',
    marginBottom: 10,
    marginTop: 10,
    height: '180px',
    width: '250px',
    '&:hover': {
      boxShadow: '0px 9px 16px 0px rgba(88,103,221,0.25)',
      borderColor: theme.palette.primary.main,
    },
  },
  cardTitle: {
    paddingTop: 8,
    paddingBottom: 18,
    marginBottom: 30,
    '& h3': {
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 0,
      color: '#6c7293',
    },
    '& span': {
      marginTop: 4,
      color: '#a7abc3',
    },
  },
}));

export default function Card({ className, title, subtitle, content }) {
  const classes = useStyles();
  const getContent = () => {
    if (Number(content)) {
      return (content >= 0 && content) || 0;
    } else {
      return content;
    }
  };
  return (
    <div className={`${classes.card} ${className}`}>
      <div className={classes.cardTitle}>
        <h3>{title}</h3>
        <span>{subtitle}</span>
      </div>
      <div className={classes.cardContent}>
        <h1>{getContent()}</h1>
      </div>
    </div>
  );
}
