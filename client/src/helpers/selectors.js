export function getItemsForDay(items, date) {
  if (items && items.length) {
    const currentDate = date.toISOString().slice(0, 10);
    return items.find(diary =>
      diary.date.slice(0, 10) === currentDate);
  }
  return null;
};

export function updatetItemsById(items, target) {
  if (items && items.length) {
    for (let i in items) {
      if (items[i].id === target.id) {
        items[i] = target;
      }
    }
    return items;
  }
  return null;
};