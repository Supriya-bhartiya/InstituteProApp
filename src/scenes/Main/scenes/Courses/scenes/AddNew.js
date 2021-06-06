import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import FormLayout from '../../../components/FormLayout';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { getData, postData, putData } from '../../../../../services/network';
import { courseFormFactory } from '../factory';
import { SET_SNACKBAR_TEXT } from '../../../../../services/store';
import Preview from '../components/Preview';

const useStyle = makeStyles(theme => ({
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
  },
  formControl: {
    margin: theme.spacing(2),
  },
  date: {
    margin: theme.spacing(2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

export default function AddNew() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [data, setData] = useState(courseFormFactory());
  const [instituteData, setInstitute] = useState([]);
  const [subjectsData, setSubject] = useState([]);

  const handleData = (key, value) => {
    if (key === 'institute') {
      data['instituteName']=value[0].name;
      data['instituteId']=value[0]._id;

      setData({ ...data});
    } else {
      setData({ ...data, [key]:value });
    }
    console.log('data', data);
  };
  const submit = async () => {
    try {
      let res;
      console.log('data to save', data);
      if (params.id === '0') {
        res = await postData(
          '/courses/save',
          { ...data }
        );
      } else {
        res = await putData(
          '/courses/update',
          { ...data }
        );
      }
      if (res && res.status === 200) {
        dispatch({
          type: SET_SNACKBAR_TEXT,
          data: {
            text: `Courses added successfully`,
            type: 'success',
          },
        });
        setData(courseFormFactory());
        history.push('/main/courses/list');
      } else {
        dispatch({
          type: SET_SNACKBAR_TEXT,
          data: {
            text: (res && res.data && res.data.message) || 'Network Error',
            type: 'error',
          },
        });
      }
    } catch (e) {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: e.message,
          type: 'error',
        },
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData('/courses/course', null, params.id);
      if (res && res.status === 200) {
        setData(courseFormFactory(res.data.course));
      }
    };
    if (params.id && params.id !== '0') {
      fetchData();
    } else {
      setData(courseFormFactory());
    }
  }, [params.id]);
  
  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await getData('/subjects/all', {});
      if (res && res.data && res.data.subjects) {
        setSubject(res.data.subjects.map(item => { return { name: item.name, subjectId: item._id } }));
      } else {
        setSubject([]);
        if (params.id === '0') {
          setData(d => ({ ...d, subjects: [] }));
        }
      }
    };
    const fetchInstitute = async () => {
      const res = await getData('/institutes/all', {});
      if (res && res.data && res.data.institutes) {
        setInstitute(res.data.institute);
      } else {
        setInstitute([]);
        if (params.id === '0') {
          setData(d => ({ ...d, instituteName: undefined, instituteId:undefined }));
        }
      }
    };
    fetchSubjects();
    fetchInstitute();

  }, []);

  return (
    <FormLayout
      onSubmit={submit}
      formLabel={
        (params.id === '0' && 'Add Course Details') || 'Edit Course Details'
      }
      previewLabel="Preview and Submit"
      form={
        <Grid container className={classes.formRoot}>
          <TextField
            label="Name"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.name}
            onChange={e => handleData('name', e.target.value)}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Subjects</InputLabel>
            <Select
              multiple
              value={data.subjects}
              onChange={e => handleData('subjects', e.target.value)}
            >
              {subjectsData.map(item => (
                <MenuItem key={item.subjectId} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            label="Batch Size"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.batchsize}
            onChange={e => handleData('batchsize', Number(e.target.value))}
          />
          <TextField
            type='number'
            label="Duration"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.duration}
            onChange={e => handleData('duration', Number(e.target.value))}
          />
          <TextField
            type='number'
            label="Course Fee"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.courseFee}
            onChange={e => handleData('courseFee', Number(e.target.value))}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Institute</InputLabel>
            <Select
              value={data.instituteName}
              onChange={e => handleData('institute', e.target.value)}
            >
              {instituteData.map(item => (
                <MenuItem key={item._id} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <KeyboardDatePicker
            className={classes.date}
            variant="inline"
            inputVariant="outlined"
            format="DD/MM/YYYY"
            margin="normal"
            label="Activation Date"
            value={data.activeSince}
            onChange={date => handleData('activeSince', date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      }
    preview={
      <Preview
        course={{
          ...data
        }}
      />
    }
    />
  );
}
