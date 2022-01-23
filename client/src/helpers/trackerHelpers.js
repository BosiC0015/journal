export default function trackerHelpers() {

  const getMyHabitsArray = (state) => {
    // returns an array of habits
    const output = [];
    const myHabits = state.myHabits
    myHabits.forEach(elm => output.push(elm.content))
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

  return { getMyHabitsArray, getStatusForHabit }
};