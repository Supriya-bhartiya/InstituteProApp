import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  titleWrapper: {
    display: "flex",
  },
  title: {
    padding: "10px 45px",
    display: "flex",
    alignItems: "stretch",
    justifySelf: "space-around",
    fontSize: 28,
    fontWeight: 500
  },
  cardWrapper: {
    display: "flex",
    padding: theme.spacing(0, 6),
    margin: theme.spacing(4, 0),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tableWrapper: {
    display: 'flex',
    padding: theme.spacing(0, 6)
  },
  footer: {
    height: "24px",
    padding: "20px 0px 30px 30px",
    flexGrow: 1,
    boxSizing: "content-box",
    backgroundColor: "blue",
    "& div": {
      margin: 0,
      padding: "0 20px 0 16px",
      fontSize: 16,
      fontWeight: 400,
      color: "#6c757d",
      lineHeight: "24px"
    },
    "& a": {
      outline: "none",
      color: "#6c757d",
      textDecoration: "none",
      backgroundColor: "transparent"
    }
  }
}));

export default function MainLayout({
  title,
  card: { left, middle, right } = {},
  table,
  classes: {
    cardWrapper = ''
  } = {}
}) {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.titleWrapper}>
        <div className={classes.title}>{title}</div>
      </Grid>
      {(left || middle || right) && (
        <Grid className={`${classes.cardWrapper} ${cardWrapper}`}>
          {left}
          {middle}
          {right}
        </Grid>
      )}
      <Grid
        className={classes.tableWrapper}
      >
        {table}
      </Grid>
    </>
  );
}
