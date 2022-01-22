import React from "react";
import useApplicationData from "../../hooks/useApplicationData";
import NavBar from '../NavBar/NavBar';
import Create from "./Create";
import Edit from "./Edit";
import { getItemsForDay } from "../../helpers/selectors";

export default function Diary() {
  const { state, submitDiary, updateDiary } = useApplicationData();

  const diary = getItemsForDay(state.diaries, new Date());

  return (
    <main>
      <NavBar />
      <h2>Let's Write a Diary</h2>
      {!diary &&
        <Create
          email={state.user.email}
          onSubmitDiary={submitDiary}
        />
      }
      {diary &&
        <Edit
          key={diary.id}
          email={state.user.email}
          id={diary.id}
          title={diary.title}
          content={diary.content}
          onSubmitDiary={updateDiary}
        />
      }
    </main >
  );

};