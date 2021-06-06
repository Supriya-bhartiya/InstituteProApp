import moment from 'moment';

export const instituteFactory = (institute, index) => ({
  id: institute._id,
  name: institute.name,
  contact: institute.landline?`${institute.mobile}/${institute.landline}`:institute.mobile,
  courses: institute.courses.map(course => ({
    name: course.name,
    batchsize: course.batchsize,
    courseFee: course.courseFee,
    duration: course.duration,
    courseId: course.courseId
  })),
  faculties: institute.faculties.map(faculty => ({
    name: faculty.name,
    subjectName: faculty.subjectName,
    facultyId: faculty.facultyId
  }))
});

export const instituteFormFactory = institute => {
  if (institute) {
    return {
      _id: institute._id,
      name: institute.name,
      mobile: institute.mobile,
      landline: institute.landline,
      addressLine1:institute.addressLine1,
      addressStreet: institute.addressStreet,
      addressCity: institute.addressCity,
      addressState: institute.addressState,
      addressPincode: institute.addressPincode,
      addressCountry: institute.addressCountry,
      licenceNo: institute.licenceNo,
      licenceYear: institute.licenceYear,
      courses: institute.courses.map(course => ({
        name: course.name,
        batchsize: course.batchsize,
        courseFee: course.courseFee,
        duration: course.duration,
        courseId: course.courseId
      })),
      faculties: institute.faculties.map(faculty => ({
        name: faculty.name,
        subjectName: faculty.subjectName,
        facultyId: faculty.facultyId
      })),
      activeSince:institute.createdAt
    };
  } else {
    return {
      name: '',
      mobile: '',
      landline: '',
      addressLine1:'' ,
      addressStreet: '',
      addressCity: '',
      addressState: '',
      addressPincode: '',
      addressCountry: 'India',
      licenceNo: '',
      licenceYear: '',
      courses: [],
      faculties: [],
      activeSince:moment()
    };
  }
};
