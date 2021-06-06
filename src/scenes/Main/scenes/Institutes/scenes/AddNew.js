import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormLayout from '../../../components/FormLayout';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { getData, postData, putData } from '../../../../../services/network';
import { instituteFormFactory } from '../factories';
import { SET_SNACKBAR_TEXT } from '../../../../../services/store';
import Preview from '../components/Preview';
import {
  states,
} from '../../../../../utils/constants';

const useStyles = makeStyles(theme => ({
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
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const [data, setData] = useState(instituteFormFactory());
  const [courses, setCourses] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const handleData = (key, value) => {
    if(key === 'faculties'){
      const obj = {
        name:value.name,
        subjectName:value.subjectName,
        facultyId:value.subjectId
      }
      data['faculties'] = obj;
      setData({ ...data});
    }else{
      setData({ ...data, [key]: value });
    }
  };

  const submit = async () => {
    try {
      let res;
      console.log('data to save', data);
      if (params.id === '0') {
        res = await postData(
          '/institutes/save',
          { ...data }
        );
      } else {
        res = await putData(
          '/institutes/update',
          { ...data }
        );
      }
      if (res && res.status === 200) {
        dispatch({
          type: SET_SNACKBAR_TEXT,
          data: {
            text: `Institute added successfully`,
            type: 'success',
          },
        });
        setData(instituteFormFactory());
        history.push('/main/institute/list');
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
      const res = await getData('/courses/all');
      if (res && res.data && res.data.courses) {
        setCourses(res.data.courses);
      } else {
        setCourses([]);
      }
      const response = await getData('/faculties/all');
      if (response && response.data && response.data.faculties) {
        setFaculties(response.data.faculties);
      } else {
        setFaculties([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData('/institutes/institute', null, params.id);
      if (res && res.status === 200) {
        const fetchedData = instituteFormFactory(res.data.institute);
        setData(fetchedData);
      }
    };
    if (params.id !== '0') {
      fetchData();
    } else {
      setData(instituteFormFactory());
    }
  }, [params.id]);


  return (
    <FormLayout
      onSubmit={submit}
      formLabel={
        (params.id === '0' && 'Add Institute Details') || 'Edit Institute Details'
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
            label="Landline"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.landline}
            onChange={e => handleData('landline', e.target.value)}
          />
          <TextField
            label="Address Line 1"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.addressLine1}
            onChange={e => handleData('addressLine1', e.target.value)}
          />
          <TextField
            label="Address Street"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.addressStreet}
            onChange={e => handleData('addressStreet', e.target.value)}
          />
          <TextField
            label="Address City"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.addressCity}
            onChange={e => handleData('addressCity', e.target.value)}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Address State</InputLabel>
            <Select
              value={data.addresState}
              onChange={e => handleData('data.addresState', e.target.value)}
            >
              {  states.map((item,index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Address Pincode"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.addressPincode}
            onChange={e => handleData('addressPincode', e.target.value)}
          />
          <TextField
            label="Lincence No"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.licenceNo}
            onChange={e => handleData('licenceNo', e.target.value)}
          />
          <TextField
            label="Lincence Year"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.licenceYear}
            onChange={e => handleData('licenceYear', e.target.value)}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Courses</InputLabel>
            <Select
              multiple
              value={data.courses}
              onChange={e => handleData('courses', e.target.value)}
            >
              {courses.map(item => (
                <MenuItem key={item.courseId} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Faculties</InputLabel>
            <Select
              value={data.faculties}
              onChange={e => handleData('faculties', e.target.value)}
            >
              {faculties.map(item => (
                <MenuItem key={item.facultyId} value={item}>
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
        institute={{
          ...data
        }}
      />
    }
    />
  );
}
