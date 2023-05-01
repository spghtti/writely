import rs from 'text-readability';

function getWordCount() {
  const editor = document.getElementById('editor') as HTMLTextAreaElement;
  if (editor) return editor.value.split(' ').length;
}

const testData = `
      Playing games has always been thought to be important to 
      the development of well-balanced and creative children; 
      however, what part, if any, they should play in the lives 
      of adults has never been researched that deeply. I believe 
      that playing games is every bit as important for adults 
      as for children. Not only is taking time out to play games 
      with our children and other adults valuable to building 
      interpersonal relationships but is also a wonderful way 
      to release built up tension. `;

console.log(rs.difficultWords(testData));
console.log(rs.difficultWords);

function getReadTime(wordCount: number) {
  const averageWPM = 180;
  if (wordCount === null || wordCount === 0) return 0;
  if (wordCount <= averageWPM) return 1;
  return Math.round(wordCount / averageWPM);
}

const Textbox = () => (
  <div>
    <textarea id="editor" name="story"></textarea>
    <button onClick={getWordCount}>Run</button>
  </div>
);

export default Textbox;
