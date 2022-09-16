// sorts given arr by a field which is assumed to be string,
// using case-insentive lexicographical sort for strings

export const sortBy = (propName) => (arr) =>
  arr.sort((a, b) => compareStrings(a[propName], b[propName]));

// sorts array by "release_date" property, using compareEntries
export const sortByReleaseDate = (arr) => {
  arr.sort(compareByReleaseDate);

  return arr;
};

const compareStrings = (str1, str2) => {
  const a = str1 ? str1.toLowerCase() : "";
  const b = str2 ? str2.toLowerCase() : "";

  if (a < b) return -1;
  else if (a > b) return 1;
  else return 0;
};

const compareByReleaseDate = (entry1, entry2) => {
  const { release_date: date1 } = entry1;
  const { release_date: date2 } = entry2;

  const year1 = date1 ? +date1.slice(0, 4) : 10000;
  const year2 = date2 ? +date2.slice(0, 4) : 10000;

  if (year1 !== year2) return year1 - year2;

  const month1 = date1 && date1.length > 4 ? +date1.slice(5, 7) : 13;
  const month2 = date2 && date2.length > 4 ? +date2.slice(5, 7) : 13;

  if (month1 !== month2) return month1 - month2;

  const day1 = date1 && date1.length > 7 ? +date1.slice(8, 10) : 32;
  const day2 = date2 && date2.length > 7 ? +date2.slice(8, 10) : 32;

  return day1 !== day2 ? day1 - day2 : compareStrings(entry1.name, entry2.name);
};

export const formatDate = (date) => date || "unknown";

export const groupBy = (fieldName) => (arr) => {
  const nullValue = arr.filter((el) => el[fieldName] == null);
  const nonNullValue = arr.filter((el) => el[fieldName] != null);

  const result = { nullValue };

  for (let el of nonNullValue) {
    const value = el[fieldName];
    result[value] = result[value] || [];
    result[value].push(el);
  }

  return result;
};

export const map = (obj, f) => {
  const result = {};

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result[prop] = f(obj[prop]);
    }
  }

  return result;
};

export const values = (obj) => {
  const result = [];

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result.push({
        prop,
        value: obj[prop],
      });
    }
  }

  return result;
};

const sortWith = (arr, keyFn) =>
  arr.sort((a, b) => {
    const val1 = keyFn(a);
    const val2 = keyFn(b);

    if (val1 < val2) return -1;
    else if (val1 > val2) return 1;
    else return 0;
  });

export const sortNonQueenEntries = (entries) =>
  sortWith(
    entries,
    (a) => a.index_by || a.artist_name.match(/^(?:The )?(.+)/)[1]
  );
