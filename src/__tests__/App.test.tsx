import App from '../App';
import { render } from '@testing-library/react';
import rs from 'text-readability';
import {
  getSentenceCount,
  getReadTime,
  getUsedWords,
} from '../components/Textbox';

test('Renders app correctly', () => {
  render(<App />);
});

test('Correctly counts words', () => {
  expect(rs.lexiconCount('')).toBe(0);
  expect(rs.lexiconCount('.')).toBe(0);
  expect(rs.lexiconCount('The meaning of life')).toBe(4);
  expect(
    rs.lexiconCount(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    )
  ).toBe(19);
});

test('Gets read time', () => {
  expect(getReadTime(643)).toBe(4);
});

test('Gets sentence count', () => {
  expect(
    getSentenceCount(
      `Nulla facilisi morbi tempus iaculis urna id. Pellentesque habitant morbi tristique senectus et netus et. Tortor id aliquet lectus proin nibh nisl condimentum. Vestibulum lorem sed risus ultricies tristique. Nisl pretium fusce id velit ut tortor pretium. Volutpat consequat mauris nunc congue nisi vitae suscipit. Ultrices sagittis orci a scelerisque purus semper eget duis at.`
    )
  ).toBe(7);
});

test('Gets often used words', () => {
  expect(getUsedWords('Duck duck duck duck goose')).toContain('duck');
});
