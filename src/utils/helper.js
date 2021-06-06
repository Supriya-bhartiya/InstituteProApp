import { languages } from './constants';

export const getLanguageName = key => {
  const lang = languages.find(l => l.code === key);
  return (lang && lang.text) || '';
};
