export default function trackerHelpers() {

  const getMyHabitsArray = (state, user_id) => {
    // returns an array of habits
    const output = [];
    const myHabits = state.myHabits;
    myHabits.forEach(elm => {
      if (elm.user_id === user_id) {
        output.push(elm.content)
      }
    })
    return output;
  };

  const getHabitsForUser = (state, user_id) => {
    const output = [];
    const myHabits = state.myHabits;
    myHabits.forEach(elm => {
      if (elm.user_id === user_id) {
        const obj = {};
        obj.habit_id = elm.id;
        obj.content = elm.content;
        output.push(obj);
      }
    })
    return output;
  };

  const getStatusForHabit = (state, habit_id) => {
    // returns an object showing days and completed status
    const output = {};
    state.habitsStatus.forEach(elm => {
      if (elm.habit_id === habit_id) {
        output[elm.day] = elm.completed;
      }
    })
    return output;
  }

  return { getMyHabitsArray, getHabitsForUser, getStatusForHabit }
};