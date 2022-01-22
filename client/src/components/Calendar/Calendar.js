
import { getCalendarEvents } from '../../helpers/selectors';
import useApplicationData from '../../hooks/useApplicationData'
import Create from './Create';
import Load from './Load';

export default function Calendar() {
  const { state, addPlan, deletePlan, updatePlan } = useApplicationData();
  const events = getCalendarEvents(state.plans);

  return (
    <main>
      {/* When plans are empty */}
      {!events &&
        <Create
          addPlan={addPlan}
          email={state.user.email}
          weekendsVisible={state.weekendsVisible}
        />}
      {/* When there are plans exist */}
      {events &&
        <Load
          addPlan={addPlan}
          deletePlan={deletePlan}
          updatePlan={updatePlan}
          email={state.user.email}
          events={events}
          weekendsVisible={state.weekendsVisible}
        />}
    </main>
  );
};