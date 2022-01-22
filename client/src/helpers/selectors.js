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

export function deleteItemsById(items, target) {
  console.log(items, target);
  if (items && items.length) {
    for (let i in items) {
      if (items[i].id === target.id) {
        items.splice(i, 1);
      }
    }
    return items;
  }
  return null;
};

export function getCalendarEvents(plans) {
  if (plans && plans.length) {
    const events = [];
    for (const plan of plans) {
      events.push({
        id: plan.id,
        title: plan.title,
        start: plan.start_date,
        end: plan.end_date,
        allDay: plan.all_day
      });
    }
    return events;
  }
  return null;
};
