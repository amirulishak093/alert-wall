export function trimAndEllipsis(text: string) {
    if (text.length <= 25) {
      return text;
    } else {
      return text.substring(0, 25) + "...";
    }
  }

export function getDateRange(numOfDays: number) {
    const malaysiaTimezoneOffset = 8 * 60; // UTC+8 in minutes
    const currentUTC = new Date();
    const malaysiaTime = new Date(currentUTC.getTime() + (malaysiaTimezoneOffset * 60 * 1000));
  
    const endOfDayMYT = new Date(malaysiaTime);
    endOfDayMYT.setHours(23, 59, 59, 999);
  
    const startOfDayMYT = new Date(endOfDayMYT);
    startOfDayMYT.setDate(endOfDayMYT.getDate() - numOfDays);
    startOfDayMYT.setHours(0, 0, 0, 0);
  
    const startOfDayUTC = new Date(startOfDayMYT.getTime() - (malaysiaTimezoneOffset * 60 * 1000));
    const endOfDayUTC = new Date(endOfDayMYT.getTime() - (malaysiaTimezoneOffset * 60 * 1000));
  
    return {
      start: startOfDayUTC,
      end: endOfDayUTC,
    };
  }
