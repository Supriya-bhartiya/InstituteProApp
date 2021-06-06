import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
  profileImage: {
    height: '250px',
    margin: '20px',
    objectFit: 'contain',
  },
  icon: {
    padding: '5px',
    borderRadius: '6px',
    border: '1px solid',
    height: '16px',
    width: '16px',
    cursor: 'pointer',
  },
  previewGrid: {
    width: '100%',
    border: '1px solid',
    borderRadius: '8px',
    borderColor: '#F2F3F8',
    margin: '10px 0px',
  },
  title: {
    display: 'flex',
    fontSize: '32px',
    fontWeight: 500,
    margin: '20px',
    justifyContent: 'flex-start',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 20px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '8px 0px',
  },
  label: {
    justifyContent: 'flex-start',
    minWidth: '200px',
    width: '200px',
  },
  value: {
    fontSize: '20px',
    textTransform: 'capitalize',
    marginLeft: '50px',
    minWidth: '200px',
  },
  dmWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 0px',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
}));
