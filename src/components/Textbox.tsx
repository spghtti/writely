import rs from 'text-readability';
import { useContext, useEffect, useCallback, ChangeEvent } from 'react';
import dictionary from '../dictionary.json';
import { Context } from '../context';

function getUsedWords(text: string) {
  const commonWords = dictionary.commonWords;

  const normalizedText = text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .split(/\s+/);

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
    .slice(0, Math.round(normalizedText.length * 0.04 + 3));
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

function getGradeLevel(text: string) {
  const result = rs.textStandard(text);
  if (result == '-1th and 0th grade') return '';
  if (result == '0th and 1st grade') return 'Below 1st';
  return result;
}

function analyzeText(text: string) {
  return {
    words: rs.lexiconCount(text),
    sentences: getSentenceCount(text),
    timeToRead: getReadTime(rs.lexiconCount(text)),
    readability: getReadability(text),
    grade: getGradeLevel(text),
    repeatedWords: getUsedWords(text),
  };
}

function updateStorage(event: ChangeEvent<HTMLTextAreaElement>) {
  if (event.currentTarget)
    sessionStorage.setItem('text', event.currentTarget.value);
}

function Textbox() {
  const context = useContext(Context);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.shiftKey && event.key === 'Enter') {
      if (document.getElementById('editor') !== null) {
        context.setAnalysis(
          analyzeText(
            (document.getElementById('editor') as HTMLInputElement).value
          )
        );
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const text = sessionStorage.getItem('text');
    const editor = document.getElementById('editor') as HTMLInputElement;
    if (editor && text) editor.value = text;
    if (document.getElementById('editor') !== null && text) {
      context.setAnalysis(analyzeText(text));
    }
  }, []);

  return (
    <div>
      <textarea id="editor" name="editor" onChange={updateStorage}></textarea>
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
        <span>Run</span>
      </button>
      <span className="aside">Or press shift + enter</span>
    </div>
  );
}
export { Textbox, getSentenceCount, getReadTime, getUsedWords };
