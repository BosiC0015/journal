import { IconContext } from 'react-icons/lib';
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineOrderedList } from 'react-icons/ai';
import { MdFormatListBulleted, MdTitle, MdHorizontalRule } from 'react-icons/md';
import { BsBlockquoteLeft } from 'react-icons/bs';
import { BiUndo, BiRedo } from 'react-icons/bi';


export default function MenuBar({ editor }) {
  if (!editor) {
    return null
  }
  // Menubar for changing text style buttons
  return (
    <div className="edit-Button-Class">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        className="edit-button"
      ><AiOutlineBold /></button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        className="edit-button"
      ><AiOutlineItalic /></button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        className="edit-button"
      ><AiOutlineStrikethrough /></button>
      <button 
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="edit-button"
      >clear marks</button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        className="edit-button"
      ><MdFormatListBulleted /></button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        className="edit-button"
      ><AiOutlineOrderedList /> </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="edit-button"
      >clear nodes</button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        className="edit-button"
      ><MdTitle /></button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        className="edit-button"
      >
      <IconContext.Provider value={{ size: '.8em' }}>
        <MdTitle />
      </IconContext.Provider>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        className="edit-button"
      >paragraph</button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        className="edit-button"
      ><BsBlockquoteLeft /></button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="edit-button"
      ><MdHorizontalRule /></button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="edit-button"
      ><BiUndo /></button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="edit-button"
      ><BiRedo /></button>
    </div>
  )
}