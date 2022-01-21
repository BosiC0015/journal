export function getDiaryForDay(diaries, date) {
  if (diaries && diaries.length) {
    const currentDate = date.toISOString().slice(0, 10);
    return diaries.find(diary =>
      diary.date.slice(0, 10) === currentDate);
  }
};