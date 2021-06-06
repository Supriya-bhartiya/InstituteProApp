import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import Table from '../../../components/Table';
import { getData, putData } from '../../../../../services/network';
import { instituteFactory, instituteFormFactory } from '../factories';
import MainLayout from '../../../components/MainLayout';
import Card from '../../../../../components/Card';
import Button from '../../../../../components/Button';
import { parseDate, TIME_FORMAT_BIG } from '../../../../../utils/timeWrapper';
import { SET_SNACKBAR_TEXT } from '../../../../../services/store';
import Dropdown from '../../../../../components/Dropdown';
import Preview from '../components/Preview';

const useStyles = makeStyles({
  card: {
    width: '27%',
  },
  dialog: {
    width: 500,
  },
  button: {
    width: '100%',
  },
});
const fetchData = async (offset, limit, setRows, setIntituteCount) => {
  let params = {
    type: 'active',
    offset,
    limit,
  };
  const res = await getData('/institutes/all', params);
  if (res && res.status === 200 && res.data && res.data.institutes) {
    setRows(res.data.institutes.map(instituteFactory));
    setIntituteCount(res.data.total_counts);
  } else {
    setRows([]);
    setIntituteCount('---');
  }
};
export default function Active() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [instituteCount, setIntituteCount] = useState('--');
  const [rows, setRows] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [institute, setInstituteData] = useState(instituteFormFactory());
  const [selectedList, setSelectedList] = useState({});
  const [selectedRow, setSelectedRow] = useState();

  const list = [
    { id: 'view', text: 'View Institute' },
    { id: 'edit', text: 'Edit Institute' },
    { id: 'delete', text: 'Delete Institute' },
  ];
  const columns = [
    { id: 'sr', label: 'Sr.', minWidth: 30 },
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'contact',
      label: 'Contact No',
      minWidth: 80,
      align: 'left',
    },
    {
      id: 'courses',
      label: 'Courses',
      minWidth: 170,
      align: 'left',
      component: row => (
        <div className={classes.dmRoot}>
          {row.courses.map(item => (
            <div key={item.courseId} className={classes.dmWrapper}>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'faculties',
      label: 'Faculties',
      minWidth: 170,
      align: 'left',
      component: row => (
        <div className={classes.dmRoot}>
          {row.faculties.map(item => (
            <div key={item.facultyId} className={classes.dmWrapper}>
              <div>{item.name}</div>/<div>{item.subjectName}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 50,
      align: 'left',
      component: data => (
        <Dropdown
          text="Action"
          list={list}
          onChange={(e, l) => {
            handleAction(l, data);
          }}
        />
      ),
    },
  ];

  const handleAction = async (l, d) => {
    if (l.id === 'view') {
      setSelectedRow(d);
      setSelectedList(l);
      fetchCourse(d.id);
    } else if (l.id === 'edit') {
      history.push('/main/institute/form/' + d.id);
    } else if (l.id === 'delete') {
      setSelectedRow(d);
      setSelectedList(l);
    }
  };
  const handleChange = (offset, limit) => {
    setOffset(offset);
    setLimit(limit);
  };
  const handleClose = () => {
    setSelectedRow();
  };
  const handleDelete = async () => {
    const res = await putData('/institutes/remove', {
      id: selectedRow.id,
    });
    if (res && res.status === 200) {
      fetchData(offset, limit, setRows, setIntituteCount);
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: `Institutes ${selectedRow.name} Deleted Successfully`,
          type: 'success',
        },
      });
    } else {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: { text: `Unable to delete Institutes`, type: 'error' },
      });
    }
  };
  const fetchCourse = async id => {
    const res = await getData('/institutes/institute', null, id);
    if (res && res.status === 200) {
      setInstituteData(instituteFormFactory(res.data.institute));
    } else {
      setInstituteData(instituteFormFactory());
    }
  };

  useEffect(() => {
    fetchData(offset, limit, setRows, setIntituteCount);
  }, [offset, limit]);

  return (
    <>
      <MainLayout
        title={`Institute List - As of ${parseDate(
          new Date(),
          TIME_FORMAT_BIG
        )}`}
        card={{
          left: (
            <Card
              title="Total Active Institute"
              subtitle=""
              content={instituteCount}
              className={classes.card}
            />
          ),
        }}
        table={
          <Table
            title="Detail of Institute"
            columns={columns}
            rows={rows}
            onChange={handleChange}
            rowsPerPageOptions={[5, 10]}
            totalRows={instituteCount}
          />
        }
      />
      <Dialog onClose={handleClose} open={!!selectedRow}>
        {selectedList && selectedList.id === 'view' && (
          <>
            <Preview institute={institute} />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
        {selectedList && selectedList.id === 'delete' && (
          <>
            <DialogContent dividers>
              Are you sure you want to DELETE {selectedRow && selectedRow.name}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
