import React, { useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.scss';
import MenuBar from './MenuBar';
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function Edit(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(props.title);
  const [error, setError] = useState('');
  // Editor object for Rich-text
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: props.content,
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
  // Call onSubmitDiary() when user trigger update button
  const onSubmit = (title) => {
    const content = editor.getJSON();
    if (validate()) {
      props.onSubmitDiary(props.id, title, content)
        .then(() => {
          alert('Successfully Updated');
          navigate("/");
        })
        .catch(err => {
          setError(`${err}`);
        });
    }
  };
  // Call onDeleteDiary() when user trigger delete button
  const onDelete = () => {
    props.onDeleteDiary(props.id)
      .then(() => {
        alert('Successfully Deleted');
        navigate("/");
      })
      .catch(err => {
        setError(`${err}`);
      });
  };

  return (
    <section>
      <section className='title'>
        <input
          className="title__input"
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
          onSubmit(title)}>Update</Button>
        <Button delete onClick={() =>
          onDelete()}>Delete</Button>
      </section>
    </section>
  )
}