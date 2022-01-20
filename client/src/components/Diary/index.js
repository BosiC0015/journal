import React, { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.scss';
import MenuBar from './MenuBar';
import NavBar from '../NavBar/NavBar';
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import useApplicationData from "../../hooks/useApplicationData";

export default function Diary(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [error, setError] = useState('');
  const { submitDiary } = useApplicationData();

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: ``,
  })
  const cancel = () => {
    navigate("/");
    // transition(BACK);
  };
  const validate = () => {
    if (!title.length) {
      setError('Error: Title must be filled');
      return false;
    }
    setError('');
    return true;
  };
  const onSubmit = (title) => {
    const content = editor.getJSON();
    if (validate()) {
      submitDiary(title, content);
    }
  };

  return (
    <main>
      <NavBar />
      <h2>Let's Write a Diary</h2>
      <section className='title'>
        <input
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
        />
      </section>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <section className="submit__validation">{error}</section>
      <section className="diary__button">
        <Button danger onClick={() => cancel()}>Cancel</Button>
        <Button confirm onClick={() =>
          onSubmit(title)}>Add Diary</Button>
      </section>
    </main>
  )
}