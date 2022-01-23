
import { getCalendarEvents } from '../../helpers/selectors';
import useUserData from '../../hooks/useUserData'
import usePlansData from '../../hooks/usePlansData';
import Create from './Create';
import Load from './Load';

export default function Calendar() {
  const { userState } = useUserData();
  const { planState, addPlan, deletePlan, updatePlan } = usePlansData();
  const events = getCalendarEvents(planState.plans);

  return (
    <main>
      {/* When plans are empty */}
      {!events &&
        <Create
          addPlan={addPlan}
          email={userState.user.email}
          weekendsVisible={planState.weekendsVisible}
        />}
      {/* When there are plans exist */}
      {events &&
        <Load
          addPlan={addPlan}
          deletePlan={deletePlan}
          updatePlan={updatePlan}
          email={userState.user.email}
          events={events}
          weekendsVisible={planState.weekendsVisible}
        />}
    </main>
  );
};