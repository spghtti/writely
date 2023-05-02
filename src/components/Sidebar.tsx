import { useContext } from 'react';
import { Context } from '../context';

function Sidebar() {
  const context = useContext(Context);

  return (
    <div>
      <ul>
        <li>{context.analysis.words}</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
}
export default Sidebar;
