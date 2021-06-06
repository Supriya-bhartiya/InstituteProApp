import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Grid, Tabs, Tab, Typography, Box } from '@material-ui/core';
import Button from '../../../components/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(6),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
  },
  base: {
    padding: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing(4),
  },
}));

function TabPanel({ children, value, index, ...other }) {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

export default function FormLayout({
  onSubmit,
  formLabel,
  previewLabel,
  form,
  preview,
  submitTag,
  dialogText,
}) {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    setOpen(false);
    onSubmit();
  };

  useEffect(() => {
    setValue(0);
  }, [history.location]);

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label={formLabel} />
        <Tab label={previewLabel} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={12} className={classes.base}>
            {form}
          </Grid>
          <Grid item xs={12} className={classes.base}>
            <Button className={classes.button} onClick={() => setValue(1)}>
              Preview
            </Button>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid item xs={12} className={classes.base}>
          {preview}
        </Grid>
        <Grid item xs={12} className={classes.base}>
          <Button className={classes.button} onClick={() => setValue(0)}>
            Go Back
          </Button>
          <Button className={classes.button} onClick={() => setOpen(true)}>
            {submitTag || 'Submit'}
          </Button>
        </Grid>
      </TabPanel>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogText || 'Do you confirm you want to submit the form'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
