// Get user today's diary
export function getDiaryForToday(items, date) {
  if (items && items.length) {
    const currentDate = date.toISOString().slice(0, 10);
    return items.find(diary =>
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
        allDay: plan.all_day
      }));
  }
  return null;
};
