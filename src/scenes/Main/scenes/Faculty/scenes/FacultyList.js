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
import { facultyFactory, facultyFormFactory } from '../factory';
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
  const res = await getData('/faculties/all', {
    offset,
    limit,
  });
  if (res && res.data && res.data.faculties) {
    setRows(res.data.faculties.map(facultyFactory));
    setCourseCount(res.data.total_counts);
  } else {
    setRows([]);
    setCourseCount('---');
  }
};
export default function FacultyList() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [courseCount, setCourseCount] = useState('---');
  const [selectedRow, setSelectedRow] = useState();
  const [selectedList, setSelectedList] = useState();
  const [facultyData, setFacultyData] = useState(facultyFormFactory());

  const list = [
    {
      id: 'view',
      text: 'View Faculty',
    },
    {
      id: 'edit',
      text: 'Edit Faculty',
    },
    {
      id: 'delete',
      text: 'Delete Faculty',
    },
  ];
  const columns = [
    { id: 'sr', label: 'Sr.', minWidth: 30 },
    {
      id: 'name',
      label: 'Name',
      minWidth: 60,
      align: 'left',
    },
    {
      id: 'mobile',
      label: 'Contact No',
      minWidth: 60,
      align: 'left',
    },
    {
      id: 'subjectName',
      label: 'Subject',
      minWidth: 170,
      align: 'left',
    },
    {
      id: 'totalExperience',
      label: 'Experience (Years)',
      minWidth: 170,
      align: 'left',
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
      history.push('/main/faculty/form/' + d.id);
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
    const res = await putData('/faculties/remove', {
      id: selectedRow.id,
    });
    if (res && res.status === 200) {
      fetchRowData(offset, limit, setRows,setCourseCount);
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: `Faculty ${selectedRow.name} Deleted Successfully`,
          type: 'success',
        },
      });
    } else {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: { text: `Unable to delete Faculty`, type: 'error' },
      });
    }
  };
  const fetchCourse = async id => {
    const res = await getData('/faculties/faculty', null, id);
    if (res && res.status === 200) {
      setFacultyData(facultyFormFactory(res.data.faculty));
    } else {
      setFacultyData(facultyFormFactory());
    }
  };

  useEffect(() => {
    fetchRowData(offset, limit, setRows,setCourseCount);
  }, [offset, limit]);

  return (
    <>
      <MainLayout
        title={`Faculty List - As of ${parseDate(
          new Date(),
          TIME_FORMAT_BIG
        )}`}
        card={{
          left: (
            <Card
              title="Total Active Faculties"
              subtitle=""
              content={courseCount}
              className={classes.card}
            />
          ),
        }}
        table={
          <Table
            title="Detail of Faculties"
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
            <Preview faculty={facultyData} />
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
