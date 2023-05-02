import rs from 'text-readability';
import { useContext } from 'react';
import { Context } from '../context';

function getWordCount() {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  if (editor) return editor.value.split(' ').length;
}

function getReadTime(wordCount: number) {
  const averageWPM = 180;
  if (wordCount === null || wordCount === 0) return 0;
  if (wordCount <= averageWPM) return 1;
  return Math.round(wordCount / averageWPM);
}

function Textbox() {
  const context = useContext(Context);
  return (
    <div>
      <textarea id="editor" name="story"></textarea>
      <button>Run</button>
    </div>
  );
}
export default Textbox;
