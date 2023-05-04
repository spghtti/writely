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
            <span className="sidebar-item-headline"> Time to read: </span>{' '}
            <span className="sidebar-item-metric">
              {context.analysis.timeToRead} min.
            </span>
          </div>
        </li>
        <li>
          <div className="sidebar-item-container">
            <span className="sidebar-item-headline">Readability:</span>{' '}
            <span className="sidebar-item-metric">
              {context.analysis.readability}
            </span>
          </div>
        </li>
        <li>
          <div className="sidebar-item-container">
            <span className="sidebar-item-headline">Reading level:</span>{' '}
            <span className="sidebar-item-metric">
              {context.analysis.readingLevel}
            </span>
          </div>
        </li>
        <div className="sidebar-item-container">
          <ul>
            <span className="sidebar-item-headline">Repeated words:</span>
            {context.analysis.repeatedWords.map((word) => (
              <li key={word}>
                <div className="repeated-word-container">{word}</div>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
}
export default Sidebar;
