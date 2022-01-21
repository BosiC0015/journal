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


  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: props.content,
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
    else if (!title.replace(/\s/g, '').length) {
      setError('Error: Title only contains whitespace');
      return false;
    }
    setError('');
    return true;
  };
  const onSubmit = (title) => {
    const content = editor.getJSON();
    if (validate()) {
      props.onSubmitDiary(props.email, props.id, title, content)
        .then(() => {
          alert('Successfully Updated');
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
          onSubmit(title)}>Update</Button>
      </section>
    </section>
  )
}