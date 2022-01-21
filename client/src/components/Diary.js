import React, { useEffect } from "react";
import useApplicationData from "../hooks/useApplicationData";
import NavBar from './NavBar/NavBar';
import Create from "./Diary/Create";
import Edit from "./Diary/Edit";
import { getDiaryForDay } from "../helpers/selectors";

export default function Diary() {
  const { state, submitDiary, updateDiary } = useApplicationData();

  const diary = getDiaryForDay(state.user.diaries, new Date());


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