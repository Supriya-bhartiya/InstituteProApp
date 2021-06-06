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
import { studentFormFactory } from '../factories';
import { SET_SNACKBAR_TEXT } from '../../../../../services/store';
import Preview from '../component/Preview';
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

  const [data, setData] = useState(studentFormFactory());
  const [courses, setCourses] = useState([]);
  const [institutes, setInstitutes] = useState([]);

  const handleData = (key, value) => {
    if(key === 'instituteName'){
      data['institutionName'] = value.name;
      data['instituteId'] = value._id;
      setData({ ...data});
    }else if(key === 'courseName'){
      data['courseName'] = value.name;
      data['courseId'] = value._id;
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
          '/students/save',
          { ...data }
        );
      } else {
        res = await putData(
          '/students/update',
          { ...data }
        );
      }
      if (res && res.status === 200) {
        dispatch({
          type: SET_SNACKBAR_TEXT,
          data: {
            text: `Student added successfully`,
            type: 'success',
          },
        });
        setData(studentFormFactory());
        history.push('/main/admission/list');
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
      const response = await getData('/institutes/all');
      if (response && response.data && response.data.institutes) {
        setInstitutes(response.data.institutes);
      } else {
        setInstitutes([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData('/students/student', null, params.id);
      if (res && res.status === 200) {
        const fetchedData = studentFormFactory(res.data.student);
        setData(fetchedData);
      }
    };
    if (params.id !== '0') {
      fetchData();
    } else {
      setData(studentFormFactory());
    }
  }, [params.id]);


  return (
    <FormLayout
      onSubmit={submit}
      formLabel={
        (params.id === '0' && 'Add Student Details') || 'Edit Student Details'
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
            label="Father's Name"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.licenceNo}
            onChange={e => handleData('fatherName', e.target.value)}
          />
          <TextField
            label="Father's Mobile"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.licenceYear}
            onChange={e => handleData('fatherMobile', e.target.value)}
          />
          <TextField
            label="Father's Occupation"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.licenceYear}
            onChange={e => handleData('fathersOccupation', e.target.value)}
          />
          <TextField
            label="Mother's Name"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.licenceNo}
            onChange={e => handleData('motherName', e.target.value)}
          />
          <TextField
            label="Mother's Mobile"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.licenceYear}
            onChange={e => handleData('motherMobile', e.target.value)}
          />
          <TextField
            label="Mother's Occupation"
            className={classes.formControl}
            margin="normal"
            variant="outlined"
            value={data.licenceYear}
            onChange={e => handleData('mothersOccupation', e.target.value)}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Course Name</InputLabel>
            <Select
              value={data.courseName}
              onChange={e => handleData('courseName', e.target.value)}
            >
              {courses.map((item,index) => (
                <MenuItem key={item.index} value={item}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Institute Name</InputLabel>
            <Select
              value={data.faculties}
              onChange={e => handleData('instituteName', e.target.value)}
            >
              {institutes.map((item,index) => (
                <MenuItem key={item.index} value={item}>
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
            label="Enrolment Start Date"
            value={data.activeSince}
            onChange={date => handleData('enrolmentStartDate', date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            className={classes.date}
            variant="inline"
            inputVariant="outlined"
            format="DD/MM/YYYY"
            margin="normal"
            label="Enrolment End Date"
            value={data.activeSince}
            onChange={date => handleData('enrolmentEndDate', date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
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
        student={{
          ...data
        }}
      />
    }
    />
  );
}
