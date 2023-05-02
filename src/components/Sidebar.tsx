import { useContext } from 'react';
import { Context } from '../context';

function Sidebar() {
  const context = useContext(Context);

  return (
    <div>
      <ul>
        <li>Words: {context.analysis.words}</li>
        <li>Time to read: {context.analysis.timeToRead} min.</li>
        <li>Readability: {context.analysis.readability}</li>
        <li>Reading level: {context.analysis.readingLevel}</li>
        <ul>
          Repeated words:
          {context.analysis.repeatedWords.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
}
export default Sidebar;
