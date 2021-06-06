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
import { facultyFormFactory } from '../factory';
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
  const [data, setData] = useState(facultyFormFactory());
  const [subjectsData, setSubject] = useState([]);

  const handleData = (key, value) => {
    if(key === 'subject'){
      data['subjectName'] = value.name;
      data['subjectId'] = value.subjectId;
      setData({ ...data});
    } else {
      setData({ ...data, [key]:value });
    }
  };

  const submit = async () => {
    try {
      let res;
      console.log('data to save', data);
      if (params.id === '0') {
        res = await postData(
          '/faculties/save',
          { ...data }
        );
      } else {
        res = await putData(
          '/faculties/update',
          { ...data }
        );
      }
      if (res && res.status === 200) {
        dispatch({
          type: SET_SNACKBAR_TEXT,
          data: {
            text: `Faculty added successfully`,
            type: 'success',
          },
        });
        setData(facultyFormFactory());
        history.push('/main/faculty/list');
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
      const res = await getData('/faculties/faculty', null, params.id);
      if (res && res.status === 200) {
        setData(facultyFormFactory(res.data.faculty));
      }
    };
    if (params.id && params.id !== '0') {
      fetchData();
    } else {
      setData(facultyFormFactory());
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
    fetchSubjects();
  }, []);

  return (
    <FormLayout
      onSubmit={submit}
      formLabel={
        (params.id === '0' && 'Add Faculty Details') || 'Edit Faculty Details'
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
          <TextField
            label="Mobile"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.mobile}
            onChange={e => handleData('mobile', e.target.value)}
          />
          <TextField
            label="Alternative Contact No"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.alternativeContactNo}
            onChange={e => handleData('alternativeContactNo', e.target.value)}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Subjects</InputLabel>
            <Select
              value={data.subjectName}
              onChange={e => handleData('subject', e.target.value)}
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
            label="Total Experience"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.totalExperience}
            onChange={e => handleData('totalExperience', Number(e.target.value))}
          />
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
        faculty={{
          ...data
        }}
      />
    }
    />
  );
}
