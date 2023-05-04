import rs from 'text-readability';
import { useContext } from 'react';
import { Context } from '../context';

function getUsedWords(text: string) {
  const commonWords = [
    'the',
    'be',
    'to',
    'of',
    'and',
    'a',
    'in',
    'that',
    'have',
    'I',
    'you',
    'we',
    'he',
    'him',
    'she',
    'her',
    'they',
    'them',
    'us',
    'it',
    'for',
    'on',
    'with',
    'as',
    'but',
    'by',
    'from',
    'or',
    'an',
    'is',
    'was',
  ];

  const normalizedText = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .split(' ');

  let result = normalizedText.reduce(function (
    obj: { [key: string]: number },
    item: string
  ) {
    if (commonWords.indexOf(item) === -1) obj[item] = (obj[item] || 0) + 1;
    return obj;
  },
  {});

  if (Object.keys(result).length === 1 && Object.keys(result)[0] === '')
    return [];

  return Object.keys(result)
    .sort(function (a, b) {
      return result[b] - result[a];
    })
    .slice(0, 5);
}

// let occurrences = arr.reduce(function(obj, item) {
//   if (commonWords.indexOf(item) === -1) obj[item] = (obj[item] || 0) + 1;
//   return obj;
// }, {});

function getWordCount(text: string) {
  if (text.split(' ').length === 1 && text.split(' ')[0] === '') return 0;
  return text.split(' ').length;
}

function getReadTime(wordCount: number) {
  const averageWPM = 180;
  if (wordCount === null || wordCount === 0) return 0;
  if (wordCount <= averageWPM) return 1;
  return Math.round(wordCount / averageWPM);
}

function getReadability(text: string) {
  const score = rs.fleschReadingEase(text);
  if (score <= 29) return 'Very confusing';
  if (score <= 49) return 'Difficult';
  if (score <= 59) return 'Fairly difficult';
  if (score <= 69) return 'Standard';
  if (score <= 79) return 'Fairly easy';
  if (score <= 89) return 'Easy';
  return 'Very easy';
}

function analyzeText(text: string) {
  return {
    words: getWordCount(text),
    timeToRead: getReadTime(getWordCount(text)),
    readability: getReadability(text),
    readingLevel: rs.fleschKincaidGrade(text),
    repeatedWords: getUsedWords(text),
  };
}

function Textbox() {
  const context = useContext(Context);

  return (
    <div>
      <textarea id="editor" name="story"></textarea>
      <button
        className="run-button"
        onClick={() => {
          context.setAnalysis(
            analyzeText(
              (document.getElementById('editor') as HTMLInputElement).value
            )
          );
        }}
      >
        Run
      </button>
    </div>
  );
}
export default Textbox;
