import moment from 'moment';

export const facultyFactory = (faculty, index) => ({
  name: faculty.name,
  mobile: faculty.mobile,
  alternativeContactNo: faculty.alternativeContactNo,
  subjectName: faculty.subjectName,
  institutes: faculty.institutes.map(intitute =>intitute.name),
  qualifications: faculty.qualifications.map(qualification => ({
    name: qualification.name,
    passingYear: qualification.passingYear,
    grade: qualification.grade,
  })),
  totalExperience: faculty.totalExperience,
  experiences: faculty.experiences.map(experience => ({
    InstitutionName: experience.InstitutionName,
    from: experience.from,
    to: experience.to,
    isCurrent: experience.isCurrent,
  })),
  activeSince: moment(faculty.createdAt),
  id: faculty._id,
  sr: index + 1,
});

export const facultyFormFactory = faculty => {
  if (faculty) {
    return {
      _id: faculty._id,
      name: faculty.name,
      mobile: faculty.mobile,
      alternativeContactNo: faculty.alternativeContactNo,
      subjectName: faculty.subjectName||undefined,
      subjectId: faculty.subjectId,
      institutes: faculty.institutes.map(intitute => ({
        name: intitute.name,
        instituteId: intitute._id
      })),
      qualification: faculty.qualifications.map(qualification => ({
        name: qualification.name,
        passingYear: qualification.passingYear,
        grade: qualification.grade,
      })),
      totalExperience: faculty.totalExperience,
      experiences: faculty.experiences.map(experience => ({
        InstitutionName: experience.InstitutionName,
        from: experience.from,
        to: experience.to,
        isCurrent: experience.isCurrent,
      })),
      activeSince: moment(faculty.createdAt)
    };
  } else {
    return {
      name: '',
      mobile: '',
      subjectName: '',
      subjectId: '',
      qualification: [],
      totalExperience: '',
      experiences: [],
      activeSince: moment()
    };
  }
};
