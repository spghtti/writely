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
    .slice(0, 8);
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
  const div = document.getElementById('readability');
  const score = rs.fleschReadingEase(text);
  if (div === null) return;
  if (score <= 29) {
    div.style.color = 'var(--very-confusing)';
    return 'Very confusing';
  }
  if (score <= 49) {
    div.style.color = 'var(--difficult)';
    return 'Difficult';
  }
  if (score <= 59) {
    div.style.color = 'var(--fairly-difficult)';
    return 'Fairly difficult';
  }
  if (score <= 69) {
    div.style.color = 'var(--standard)';
    return 'Standard';
  }
  if (score <= 79) {
    div.style.color = 'var(--fairly-easy)';
    return 'Fairly Easy';
  }
  if (score <= 89) {
    div.style.color = 'var(--easy)';
    return 'Easy';
  }
  div.style.color = 'var(--very-easy)';
  return 'Very easy';
}

function getSentenceCount(text: string) {
  return text.split('.').length - 1;
}

function analyzeText(text: string) {
  return {
    words: rs.lexiconCount(text),
    sentences: getSentenceCount(text),
    timeToRead: getReadTime(rs.lexiconCount(text)),
    readability: getReadability(text),
    readingLevel: rs.fleschKincaidGrade(text),
    grade: rs.textStandard(text),
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
          if (document.getElementById('editor') !== null) {
            context.setAnalysis(
              analyzeText(
                (document.getElementById('editor') as HTMLInputElement).value
              )
            );
          }
        }}
      >
        Run
      </button>
    </div>
  );
}
export default Textbox;
