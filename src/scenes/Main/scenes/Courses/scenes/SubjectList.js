import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Dialog, DialogActions } from '@material-ui/core';

import Table from '../../../components/Table';
import { getData } from '../../../../../services/network';
import MainLayout from '../../../components/MainLayout';
import Card from '../../../../../components/Card';
import Button from '../../../../../components/Button';
import { parseDate, TIME_FORMAT_BIG } from '../../../../../utils/timeWrapper';
import { subjectFactory,subjectFormFactory } from '../factory';
import PreviewSubject from '../components/PreviewSubject';

const useStyles = makeStyles({
  card: {
    width: '27%',
    marginRight: '40px',
  },
  dialog: {
    width: 500,
  },
  cardWrapper: {
    justifyContent: 'flex-start',
  },
});
const fetchData = async (offset, limit, setRows, setActiveSubject) => {
  const res = await getData('/subjects/all', {
    offset,
    limit,
  });
  if (res && res.status === 200 && res.data && res.data.subjects) {
    setRows(res.data.subjects.map(subjectFactory));
    setActiveSubject(res.data.total_counts);
  } else {
    setRows([]);
    setActiveSubject('---');
  }
};
export default function SubjectList() {
  const classes = useStyles();
  const [activeSubject, setActiveSubject] = useState('--');
  const [rows, setRows] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [listData, setListData] = useState();
  const [subjectData, setSubjectData] = useState(subjectFormFactory());

  const columns = [
    { id: 'sr', label: 'Sr.', minWidth: 30 },
    {
      id: 'name',
      label: 'Name',
      minWidth: 140,
      align: 'left',
    },
    {
      id: 'subjectCode',
      label: 'Subject Code',
      minWidth: 140,
      align: 'left',
    },
  ];


  const handleChange = (offset, limit) => {
    setOffset(offset);
    setLimit(limit);
  };

  const handleClose = () => {
    setListData();
    setSubjectData(subjectFormFactory());
  };

  useEffect(() => {
    fetchData(offset, limit, setRows, setActiveSubject);
  }, [offset, limit]);
  return (
    <>
      <MainLayout
        title={`Active Subject - As of ${parseDate(
          new Date(),
          TIME_FORMAT_BIG
        )}`}
        classes={{
          cardWrapper: classes.cardWrapper,
        }}
        card={{
          left: (
            <Card
              title="Total Active Subjects"
              subtitle=""
              content={activeSubject}
              className={classes.card}
            />
          ),
        }}
        table={
          <Table
            title="List of Active Subjects"
            columns={columns}
            rows={rows}
            onChange={handleChange}
            rowsPerPageOptions={[5, 10]}
            totalRows={activeSubject}
          />
        }
      />
      <Dialog onClose={handleClose} open={!!listData}>
        {listData && listData.id === 'view' && (
          <>
            <PreviewSubject subject={subjectData} />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
}
