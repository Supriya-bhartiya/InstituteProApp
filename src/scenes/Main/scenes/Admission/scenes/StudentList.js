import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Button from '../../../../../components/Button';
import Table from '../../../components/Table';
import { getData, putData } from '../../../../../services/network';
import Card from '../../../../../components/Card';
import MainLayout from '../../../components/MainLayout';
import { parseDate, TIME_FORMAT_BIG } from '../../../../../utils/timeWrapper';
import Dropdown from '../../../../../components/Dropdown';
import { studentFactory, studentFormFactory } from '../factories';
import { SET_SNACKBAR_TEXT } from '../../../../../services/store';
import Preview from '../component/Preview';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
  card: {
    width: '27%',
  },
});
const fetchData = async (offset, limit, setStudentCount, setRows) => {
  const res = await getData('/students/all', {
    offset,
    limit,
  });
  if (res && res.data && res.data.students) {
    setStudentCount(res.data.total_counts);
    setRows(res.data.students.map(studentFactory));
  } else {
    setRows([]);
  }
};
export default function StudentList() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [studentCount, setStudentCount] = useState('---');
  const [selectedRow, setSelectedRow] = useState();
  const [selectedList, setSelectedList] = useState();
  const [studentData, setStudentData] = useState(studentFormFactory());
  const list = [
    { id: 'view', text: 'View Student' },
    { id: 'edit', text: 'Edit Student' },
    { id: 'delete', text: 'Delete Student' },
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
      id: 'mobile',
      label: 'Mobile',
      minWidth: 60,
      align: 'left',
    },
    {
      id: 'courseName',
      label: 'Course Name',
      minWidth: 60,
      align: 'left',
    },
    {
      id: 'institutionName',
      label: 'Institute Name',
      minWidth: 60,
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

  const handleClose = () => {
    setSelectedRow();
    setStudentData(studentFormFactory());
    setSelectedList();
  };
  const handleChange = (offset, limit) => {
    setOffset(offset);
    setLimit(limit);
  };
  const handleAction = async (l, data) => {
    if (l.id === 'view') {
      setSelectedList(l);
      setSelectedRow(data);
      fetchStudent(data.id);
    } else if (l.id === 'edit') {
      history.push('/main/admission/form/' + data.id);
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: { text: 'Edit Student Now', type: 'success' },
      });
    } else if (l.id === 'delete') {
      setSelectedRow(data);
      setSelectedList(l);
    }
  };
  const handleDelete = async () => {
    if (selectedRow) {
      const res = await putData('/students/remove', {
        _id: selectedRow.id,
      });
      if (res && res.status === 200) {
        dispatch({
          type: SET_SNACKBAR_TEXT,
          data: {
            text: `${selectedRow.name} deleted successfully`,
            type: 'success',
          },
        });
        fetchData(offset, limit, setStudentCount, setRows);
      } else {
        dispatch({
          type: SET_SNACKBAR_TEXT,
          data: { text: 'Unable to delete', type: 'error' },
        });
      }
    }
    handleClose();
  };
  const fetchStudent = async id => {
    const res = await getData('/students/student', null, id);
    if (res && res.status === 200) {
      setStudentData(studentFormFactory(res.data.student));
    } else {
      setStudentData(studentFormFactory());
    }
  };

  useEffect(() => {
    fetchData(offset, limit, setStudentCount, setRows);
  }, [offset, limit]);

  return (
    <>
      <MainLayout
        title={`Partnered Students - As of ${parseDate(
          new Date(),
          TIME_FORMAT_BIG
        )}`}
        card={{
          left: (
            <Card
              title="Active Students"
              subtitle=""
              content={studentCount}
              className={classes.card}
            />
          ),
        }}
        table={
          <Table
            title="List of Active Students"
            columns={columns}
            rows={rows}
            onChange={handleChange}
            rowsPerPageOptions={[5, 10]}
          />
        }
      />
      <Dialog
        open={!!selectedRow}
        TransitionComponent={Transition}
        onClose={handleClose}
      >
        {selectedList && selectedList.id === 'view' && (
          <>
            <Preview
              student={{
                ...studentData
              }}
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </>
        )}
        {selectedList && selectedList.id === 'delete' && (
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Do you confirm you want to <b>DELETE</b> the{' '}
                <b>{selectedRow && selectedRow.name}</b>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="primary">
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
