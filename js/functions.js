const сheckLine = (string, maxLong) => string.length <= maxLong;

сheckLine();


const palindrome = (string) => {
  const newString = string.replaceAll(' ', '').toUpperCase();

  let blankString = '';

  for (let i = newString.length - 1; i >= 0; i--) {
    blankString += newString.at(i);
  } return blankString === newString;
};

palindrome();

