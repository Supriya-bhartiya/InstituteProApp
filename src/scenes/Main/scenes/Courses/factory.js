import { parseDate } from '../../../../utils/timeWrapper';
import moment from 'moment';

export const courseFactory = (course, index) => ({
  name: course.name,
  subjects: course.subjects.map(subject => ({
    name: subject.name,
    subjectId:subject._id
  })),
  instituteName: course.instituteName,
  activeSince: parseDate(course.createdAt),
  id: course._id,
  sr: index + 1,
});
export const subjectFactory = (subject, index) => ({
  name: subject.name,
  subjectCode:subject.code,
  activeSince: parseDate(subject.createdAt),
  id: subject._id,
  sr: index + 1,
});

export const courseFormFactory = course => {
  if (course) {
    return {
      _id: course._id,
      name: course.name,
      subjects: course.subjects.map(subject => ({
        name: subject.name,
        subjectId:subject._id
      })),
      activeSince: moment(course.createdAt),
      instituteId: course.instituteId||undefined,
      instituteName: course.instituteName||undefined,
      batchsize:course.batchsize,
      duration:course.duration,
      courseFee:course.courseFee

    };
  } else {
    return {
      name: '',
      subjects: [],
      activeSince: moment(),
      instituteId: '',
      instituteName: '',
      batchsize:'',
      duration:'',
      courseFee:''


    };
  }
};

export const subjectFormFactory = subject => {
  if (subject) {
    return {
      name: subject.name,
      subjectCode:subject.code,
      activeSince: parseDate(subject.createdAt),
      id: subject._id,
    };
  } else {
    return {
      name: '',
      subjectCode: '',
      activeSince: moment()
    };
  }
};
