import useApplicationData from "../hooks/useApplicationData";
import NavBar from './NavBar/NavBar';
import DiaryFramework from "./Diary/DiaryFramework";
import { getDiaryForDay } from "../helpers/selectors";

export default function Diaries() {
  const { state, submitDiary } = useApplicationData();

  const diary = getDiaryForDay(
    state.user.diaries, new Date());
  console.log(diary);

  return (
    <main>
      <NavBar />
      <h2>Let's Write a Diary</h2>
      <DiaryFramework
        email={state.user.email}
        // title={diary.title}
        // content={diary.content}
        diary={diary}
        onSubmitDiary={submitDiary} />
    </main >
  );

};