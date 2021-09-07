const dob = document.querySelector("#date");
const message = document.querySelector("#message");
const next_Palindrome = document.querySelector("#next-palindrome");
const pre_Palindrome = document.querySelector("#pre-palindrome");
const checkButton = document.querySelector("#check-btn");
const loader = document.querySelector("#loader");

function reverse_str(str) {
  return str.split("").reverse().join("");
}

function check_palindrome(str) {
  let reverse = reverse_str(str);

  return str === reverse;
}

function convertDateAsString(date) {
  let dateStr = {
    day: "",
    month: "",
    yr: "",
  };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.yr = date.yr.toString();

  return dateStr;
}

function all_dates_array(date) {
  let stringDates = convertDateAsString(date);

  let ddmmyy = stringDates.day + stringDates.month + stringDates.yr.slice(-2);
  let mmddyy = stringDates.month + stringDates.day + stringDates.yr.slice(-2);
  let yymmdd = stringDates.yr.slice(-2) + stringDates.month + stringDates.day;

  let ddmmyyyy = stringDates.day + stringDates.month + stringDates.yr;
  let mmddyyyy = stringDates.month + stringDates.day + stringDates.yr;
  let yyyymmdd = stringDates.yr + stringDates.month + stringDates.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function check_Palindrome_For_Date(date) {
  let list_dates = all_dates_array(date);
  let bool = false;
  for (let i = 0; i < list_dates.length; i++) {
    if (check_palindrome(list_dates[i])) {
      bool = true;
      break;
    }
  }
  return bool;
}

function leap_yr(yr) {
  if ((yr % 400 == 0 && yr % 100 != 0) || yr % 4 == 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let yr = date.yr;

  let months_array = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (leap_yr(yr)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > months_array[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    yr++;
  }

  return {
    day,
    month,
    yr,
  };
}

function next_PalindromeDate(date) {
  let count = 0;
  let nextDate = getNextDate(date);

  while (1) {
    count++;
    let isPalindrome = check_Palindrome_For_Date(nextDate);
    if (isPalindrome) {
      break;
    }

    nextDate = getNextDate(nextDate);
  }

  return [count, nextDate];
}

function getPreviousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let yr = date.yr;

  let months_array = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 3) {
    if (leap_yr(yr)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (month === 1 && day < 1) {
      day = 31;
      month = 12;
      yr--;
    }
    if (month > 1 && day < 1) {
      day = months_array[month - 2];
      month--;
    }
  }

  return {
    day,
    month,
    yr,
  };
}

function pre_PalindromeDate(date) {
  let count = 0;
  let previousDate = getPreviousDate(date);

  while (1) {
    count++;
    let isPalindrome = check_Palindrome_For_Date(previousDate);
    if (isPalindrome) {
      break;
    }

    previousDate = getPreviousDate(previousDate);
  }

  return [count, previousDate];
}

loader.style.display = "none";

function clickHandler() {
  loader.style.display = "block";
  message.style.display = "none";
  next_Palindrome.style.display = "none";
  pre_Palindrome.style.display = "none";

  setTimeout(() => {
    loader.style.display = "none";
    checkButton.style.display = "none";

    let dobVal = dob.value.split("-");

    let date = {
      day: Number(dobVal[2]),

      month: Number(dobVal[1]),
      yr: Number(dobVal[0]),
    };

    if (check_Palindrome_For_Date(date)) {
      message.style.display = "block";
      message.style.color = "green";
      message.innerText = "Congrats!! your Birthday is a Palindrome";
      next_Palindrome.style.display = "none";
      pre_Palindrome.style.display = "none";
    } else {
      message.style.display = "block";
      message.style.color = "blue";
      message.innerText = "oops! your Birthday is not a palindrome";
      let [count, nextDate] = next_PalindromeDate(date);
      let [ctr, previousDate] = pre_PalindromeDate(date);
      next_Palindrome.style.display = "block";
      pre_Palindrome.style.display = "block";
      next_Palindrome.innerText = `Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.yr}, you missed it by ${count} days.`;
      pre_Palindrome.innerText = `Previous Palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.yr}, you missed it by ${ctr} days.`;
    }
  }, 3000);
}

checkButton.addEventListener("click", clickHandler);
