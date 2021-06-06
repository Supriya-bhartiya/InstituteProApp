import moment from 'moment';

export const studentFactory = (student, index) => ({
  name: student.name,
  mobile: student.mobile,
  institutionName: student.institutionName,
  courseName:student.courseName,
  id: student._id,
  sr: index + 1,
});

export const studentFormFactory = student => {
  if (student) {
    return {
      _id: student._id,
      name: student.name,
      dob:moment(student.dob),
      mobile:student.mobile,
      addressLine1:student.addressLine1,
      addressStreet:student.addressStreet,
      addressCity:student.addressCity,
      addressState:student.addressState,
      addressPincode:student.addressPincode,
      addressCountry:student.addressCountry,
      fatherName:student.fatherName,
      fathersOccupation:student.fathersOccupation,
      fatherMobile:student.fatherMobile,
      motherName:student.motherName,
      mothersOccupation:student.mothersOccupation,
      motherMobile:student.motherMobile,
      instituteId:student.instituteId,
      institutionName:student.institutionName,
      courseName:student.courseName,
      courseId:student.courseId,
      enrolmentStartDate:moment(student.enrolmentStartDate),
      enrolmentEndDate:moment(student.enrolmentEndDate),
      isEnrolled:student.isEnrolled,
      activeSince:moment(student.createdAt)
    };
  } else {
    return {
      name: '',
      dob:moment(),
      mobile:'',
      addressLine1:'',
      addressStreet:'',
      addressCity:'',
      addressState:'',
      addressPincode:'',
      addressCountry:'',
      fatherName:'',
      fathersOccupation:'',
      fatherMobile:'',
      motherName:'',
      mothersOccupation:'',
      motherMobile:'',
      instituteId:'',
      institutionName:'',
      courseName:'',
      courseId:'',
      enrolmentStartDate:moment(),
      enrolmentEndDate:moment(),
      isEnrolled:true,
      activeSince:moment()
    };
  }
};

export const addressFactory = address => {
  if (address) {
    return {
      name: address.house_no,
      plot: address.plot_no,
      sector: address.sector,
      street: address.street_name,
      landmark: address.landmark,
      state: address.state,
      district: address.district,
      pincode: address.pincode,
    };
  } else {
    return {
      name: '',
      plot: '',
      sector: '',
      street: '',
      landmark: '',
      state: '',
      district: '',
      pincode: '',
    };
  }
};
