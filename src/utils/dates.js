import { numberWithSuffix } from "./numbers";

// convert the `new Date().getDay()` number to it's verbose representation.
export const getDayName = num => {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "ERROR parsing day";
  }
};

// conver the `new Date().getMonth()` number to it's verbose representation.
export const getMonthName = num => {
  switch (num) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "ERROR parsing month ";
  }
};

// conver the `new Date().getMonth()` number to it's verbose representation.
export const getMonthShortName = num => {
  switch (num) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sept";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "ERROR parsing month ";
  }
};

// project specific.
// get the date string from the announcements and job listing
export const verboseDate = timestamp => {
  const date = new Date(timestamp * 1000);
  const verboseDayName = getDayName(date.getDay());
  const verboseMonthName = getMonthName(date.getMonth());
  const suffixedDate = numberWithSuffix(date.getDate());
  return `${verboseDayName}, ${verboseMonthName} ${suffixedDate} ${date.getFullYear()}`;
};

export const shortDate = timestamp => {
  const date = new Date(timestamp * 1000);
  const shortDayName = date.getDate();
  const shortMonthName = getMonthShortName(date.getMonth());
  return `${shortDayName} ${shortMonthName} ${date.getFullYear()}`;
};
