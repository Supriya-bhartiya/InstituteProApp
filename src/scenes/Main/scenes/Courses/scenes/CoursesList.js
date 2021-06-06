import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import Button from '../../../../../components/Button';
import Table from '../../../components/Table';
import { getData, putData } from '../../../../../services/network';
import Card from '../../../../../components/Card';
import { makeStyles } from '@material-ui/styles';
import MainLayout from '../../../components/MainLayout';
import { parseDate, TIME_FORMAT_BIG } from '../../../../../utils/timeWrapper';
import { courseFactory, courseFormFactory } from '../factory';
import Dropdown from '../../../../../components/Dropdown';
import { SET_SNACKBAR_TEXT } from '../../../../../services/store';
import Preview from '../components/Preview';

const useStyles = makeStyles({
  card: {
    width: '27%',
  },
  dmRoot: {
    display: 'fles',
    flexDirection: 'column',
  },
  dmWrapper: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 0px',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const fetchRowData = async (offset, limit, setRows,setCourseCount) => {
  const res = await getData('/courses/all', {
    offset,
    limit,
  });
  if (res && res.data && res.data.courses) {
    setRows(res.data.courses.map(courseFactory));
    setCourseCount(res.data.total_counts);
  } else {
    setRows([]);
    setCourseCount('---');
  }
};
export default function DistrictList() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [courseCount, setCourseCount] = useState('---');
  const [selectedRow, setSelectedRow] = useState();
  const [selectedList, setSelectedList] = useState();
  const [courseData, setCourseData] = useState(courseFormFactory());

  const list = [
    {
      id: 'view',
      text: 'View Course',
    },
    {
      id: 'edit',
      text: 'Edit Course',
    },
    {
      id: 'delete',
      text: 'Delete Course',
    },
  ];
  const columns = [
    { id: 'sr', label: 'Sr.', minWidth: 30 },
    {
      id: 'activeSince',
      label: 'Active Since',
      minWidth: 100,
      align: 'left',
    },
    {
      id: 'name',
      label: 'Name',
      minWidth: 60,
      align: 'left',
    },
    {
      id: 'instituteName',
      label: 'Institute',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'subjects',
      label: 'Subjects',
      minWidth: 170,
      align: 'left',
      component: row => (
        <div className={classes.dmRoot}>
          {row.subjects.map(item => (
            <div key={item.subjectId} className={classes.dmWrapper}>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'action',
      label: 'Action',
      minWidth: 170,
      align: 'left',
      component: data => (
        <Dropdown
          text="Action"
          list={list}
          onChange={(e, l) => handleAction(l, data)}
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
      history.push('/main/courses/form/' + d.id);
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
    const res = await putData('/courses/remove', {
      id: selectedRow.id,
    });
    if (res && res.status === 200) {
      fetchRowData(offset, limit, setRows,setCourseCount);
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: `Course ${selectedRow.name} Deleted Successfully`,
          type: 'success',
        },
      });
    } else {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: { text: `Unable to delete Course`, type: 'error' },
      });
    }
  };
  const fetchCourse = async id => {
    const res = await getData('/courses/course', null, id);
    if (res && res.status === 200) {
      setCourseData(courseFormFactory(res.data.course));
    } else {
      setCourseData(courseFormFactory());
    }
  };

  useEffect(() => {
    fetchRowData(offset, limit, setRows,setCourseCount);
  }, [offset, limit]);

  return (
    <>
      <MainLayout
        title={`Courses List - As of ${parseDate(
          new Date(),
          TIME_FORMAT_BIG
        )}`}
        card={{
          left: (
            <Card
              title="Total Active Courses"
              subtitle=""
              content={courseCount}
              className={classes.card}
            />
          ),
        }}
        table={
          <Table
            title="Detail of Courses"
            columns={columns}
            rows={rows}
            onChange={handleChange}
            rowsPerPageOptions={[5, 10]}
            totalRows={courseCount}
          />
        }
      />
      <Dialog onClose={handleClose} open={!!selectedRow}>
        {selectedList && selectedList.id === 'view' && (
          <>
            <Preview course={courseData} />
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
