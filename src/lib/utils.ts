export function trimAndEllipsis(text: string) {
    if (text.length <= 25) {
      return text;
    } else {
      return text.substring(0, 25) + "...";
    }
  }

export function convertToMalaysiaTime(date: Date): Date {
  const malaysiaTimezoneOffset = 8 * 60; // UTC+8 in minutes
  return new Date(date.getTime() + (malaysiaTimezoneOffset * 60 * 1000));
}

export function getDateRange(numOfDays: number): { start: Date, end: Date } {
  const malaysiaTime = convertToMalaysiaTime(new Date());
  
  const endOfDayMYT = new Date(malaysiaTime);
  endOfDayMYT.setHours(23, 59, 59, 999);
  
  const startOfDayMYT = new Date(endOfDayMYT);
  startOfDayMYT.setDate(endOfDayMYT.getDate() - numOfDays);
  startOfDayMYT.setHours(0, 0, 0, 0);
  
  const startOfDayUTC = convertToMalaysiaTime(startOfDayMYT);
  const endOfDayUTC = convertToMalaysiaTime(endOfDayMYT);
  
  return {
    start: startOfDayUTC,
    end: endOfDayUTC,
  };
}
