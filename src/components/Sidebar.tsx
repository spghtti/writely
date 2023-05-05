import { useContext } from 'react';
import { Context } from '../context';

function Sidebar() {
  const context = useContext(Context);

  return (
    <div>
      <ul>
        <li>
          <div className="sidebar-item-container">
            <span className="sidebar-item-headline">Words:</span>{' '}
            <span className="sidebar-item-metric">
              {context.analysis.words}
            </span>
          </div>
        </li>
        <li>
          <div className="sidebar-item-container">
            <span className="sidebar-item-headline">Sentences:</span>{' '}
            <span className="sidebar-item-metric">
              {context.analysis.sentences}
            </span>
          </div>
        </li>
        <li>
          <div className="sidebar-item-container">
            <span className="sidebar-item-headline"> Time to read: </span>{' '}
            <span className="sidebar-item-metric">
              {context.analysis.timeToRead} min.
            </span>
          </div>
        </li>
        <li>
          <div className="sidebar-item-container">
            <span className="sidebar-item-headline">Readability:</span>{' '}
            <span className="sidebar-item-metric" id="readability">
              {context.analysis.readability}
            </span>
          </div>
        </li>
        <li>
          <div className="sidebar-item-container">
            <span className="sidebar-item-headline">Grade level:</span>{' '}
            <span className="sidebar-item-metric">
              {context.analysis.grade}
            </span>
          </div>
        </li>
        <div className="sidebar-item-container" id="repeated-words">
          <span className="sidebar-item-headline">Often-used words:</span>
          <ul>
            {context.analysis.repeatedWords.map((word) => (
              <li key={word} className="repeated-word-container">
                <div className="repeated-word">{word}</div>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
}
export default Sidebar;
