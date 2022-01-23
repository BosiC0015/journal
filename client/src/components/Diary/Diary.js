import React from "react";
import useDiariesData from "../../hooks/useDiariesData";
import NavBar from '../NavBar/NavBar';
import Create from "./Create";
import Edit from "./Edit";
import { getDiaryForToday } from "../../helpers/selectors";
import useUserData from "../../hooks/useUserData";

export default function Diary() {
  const { userState } = useUserData();
  const { diaryState, submitDiary, updateDiary, deleteDiary } = useDiariesData();
  const diary = getDiaryForToday(diaryState.diaries, new Date());

  return (
    <main>
      <NavBar />
      <h2>Let's Write a Diary</h2>
      {/* When diaries are empty */}
      {!diary &&
        <Create
          email={userState.user.email}
          onSubmitDiary={submitDiary}
        />
      }
      {/* When there are plans exist */}
      {diary &&
        <Edit
          key={diary.id}
          email={userState.user.email}
          id={diary.id}
          title={diary.title}
          content={diary.content}
          onSubmitDiary={updateDiary}
          onDeleteDiary={deleteDiary}
        />
      }
    </main >
  );

};