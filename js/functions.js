const сheckLine = (string, maxLong) => string.length <= maxLong;

сheckLine('проверяемая строка', 20);


const сheckPalindrome = (string) => {
  const newString = string.replaceAll(' ', '').toUpperCase();

  let blankString = '';

  for (let i = newString.length - 1; i >= 0; i--) {
    blankString += newString.at(i);
  } return blankString === newString;
};

сheckPalindrome('ДовОд');


const checkNumberFromString = (string) => {
  let num = '';
  const newString = string.toString().replaceAll(' ', '');

  for (let i = 0; i < newString.length; i++) {
    if (!isNaN(newString[i])) {
      num += newString[i];
    }
  }
  return parseInt(num, 10);
};

checkNumberFromString(-15);


// 5.16. ФУНКЦИИ ВОЗВРАЩАЮТСЯ

const timeToMinutes = (time) => {
  const divisionTime = time.split(':');
  const hours = parseInt(divisionTime[0], 10);
  const minutes = parseInt(divisionTime[1], 10);
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
};

const scheduleMeeting = (startWork, endWork, startMeeting, durationMeeting) => {
  const startWorkMinutes = timeToMinutes(startWork);
  const endWorkMinutes = timeToMinutes(endWork);
  const startMeetingMinutes = timeToMinutes(startMeeting);
  const endMeetingMinutes = startMeetingMinutes + durationMeeting;

  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
};

scheduleMeeting('09:00', '17:00', '14:00', 60);


