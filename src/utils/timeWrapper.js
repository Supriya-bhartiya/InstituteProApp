import moment from 'moment';

export const TIME_FORMAT_SMALL = 'MMM DD, YYYY';
export const TIME_FORMAT_BIG = 'MMMM DD, YYYY';

export const parseDate = (date, format) => 
  moment(date).format(format || TIME_FORMAT_SMALL);

export const daysTill = date => 
  moment(date).diff(moment(), "days");
