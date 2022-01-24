// Get user today's diary
export function getDiaryById(diaries, id) {
  if (diaries && diaries.length) {
    return diaries.find(diary => diary.id === id);
  }
  return null;
};

// Get user today's diary
export function getDiaryForToday(diaries, date) {
  if (diaries && diaries.length) {
    const currentDate = date.toISOString().slice(0, 10);
    return diaries.find(diary =>
      diary.date.slice(0, 10) === currentDate);
  }
  return null;
};

// Update items array by given a target item
export function updatetItemsById(items, target) {
  if (items && items.length) {
    const index = items.findIndex(itm => itm.id === target.id);
    items[index] = target;
    return items;
  }
  return null;
};

// Delete a target item from a given items array
export function deleteItemsById(items, target) {
  if (items && items.length) {
    const index = items.findIndex(itm => itm.id === target.id);
    items.splice(index, 1);
    return items;
  }
  return null;
};

// Convert plans into events to show them on calendar
export function getCalendarEvents(plans) {
  if (plans && plans.length) {
    return plans.map(plan =>
      Object.create({
        id: plan.id,
        title: plan.title,
        start: plan.start_date,
        end: plan.end_date,
        allDay: plan.all_day,
        backgroundColor: 'lightblue'
      }));
  }
  return null;
};

// Convert Dairies into events to show them on calendar
export function getCalendarDiaries(diaries) {
  if (diaries && diaries.length) {
    return diaries.map(diary =>
      Object.create({
        id: diary.id,
        title: diary.title,
        extendedProps: diary.content,
        start: diary.date,
        allDay: true,
        editable: false,
        backgroundColor: 'orange'
      }));
  }
  return null;
};
