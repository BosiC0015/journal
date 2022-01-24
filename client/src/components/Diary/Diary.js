import React from "react";
import { useLocation } from 'react-router-dom';
import useDiariesData from "../../hooks/useDiariesData";
import NavBar from '../NavBar/NavBar';
import Create from "./Create";
import Edit from "./Edit";
import { getDiaryForToday } from "../../helpers/selectors";
import useUserData from "../../hooks/useUserData";

export default function Diary() {
  const location = useLocation();
  const { userState } = useUserData();
  const { diaryState, submitDiary, updateDiary, deleteDiary } = useDiariesData();
  const diary = getDiaryForToday(diaryState.diaries, new Date());

  if (!location.state) {
    return (
      <main>
        <NavBar />
        <h2>Let's Write a Diary</h2>
        {/* There is no today diary */}
        {!diary &&
          <Create
            email={userState.user.email}
            onSubmitDiary={submitDiary}
          />
        }
        {/* Edit exisited today diary */}
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
  }
  else {
    const { email, id, title, content } = location.state;
    return (
      <main>
        <NavBar />
        <h2>Let's Write a Diary</h2>
        {/* Today diary not exist but user select another day */}
        {!diary &&
          <Edit
            key={id}
            email={email}
            id={id}
            title={title}
            content={content}
            onSubmitDiary={updateDiary}
            onDeleteDiary={deleteDiary}
          />
        }
        {/* Edit another day diary */}
        {diary &&
          <Edit
            key={id}
            email={email}
            id={id}
            title={title}
            content={content}
            onSubmitDiary={updateDiary}
            onDeleteDiary={deleteDiary}
          />
        }
      </main >
    );
  }

};