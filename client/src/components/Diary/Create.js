import React, { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.scss';
import MenuBar from './MenuBar';
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function Create(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  // Editor object for Rich-text
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: ``,
  })

  // Navigate to home page when user trigger cancel button
  const cancel = () => {
    navigate("/");
  };
  // Validation for user input
  const validate = () => {
    if (!title.length) {
      setError('Error: Title must be filled');
      return false;
    }
    else if (!title.replace(/\s/g, '').length) {
      setError('Error: Title only contains whitespace');
      return false;
    }
    setError('');
    return true;
  };
  // Call onSubmitDiary() when user create a new diary
  const onSubmit = (title) => {
    if (!props.isLoggedin) {
      alert('Please Login an Account');
      return;
    }
    const content = editor.getJSON();
    if (validate()) {
      props.onSubmitDiary(props.email, title, content)
        .then(() => {
          alert('Successfully Submitted');
          navigate("/");
        })
        .catch(err => {
          setError(`${err}`);
        });
    }
  };

  return (
    <section>
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
          onSubmit(title)}>Submit</Button>
      </section>
    </section>
  )
}