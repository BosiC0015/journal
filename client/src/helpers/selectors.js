export function getDiaryForDay(diaries, date) {
  if (diaries && diaries.length) {
    const currentDate = date.toISOString().slice(0, 10);
    return diaries.find(diary =>
      diary.date.slice(0, 10) === currentDate);
  }
  return null;
};

export function updatetDiaryById(diaries, target) {
  if (diaries && diaries.length) {
    for (let i in diaries) {
      if (diaries[i].id === target.id) {
        diaries[i] = target;
      }
    }
    return diaries;
  }
  return null;
};