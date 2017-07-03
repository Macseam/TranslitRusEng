var transliterateEngRu = function(enteredValue, urlReady){

  // Сочетания двух букв для транслитерации

  var doubleLetters = [
    'yo',
    'zh',
    'cz',
    'ch',
    'sh',
    'yu',
    'ju',
    'ya',
    'ja',
    'ts',
    'kh',
    'iy'
  ];

  // Сочетания трёх букв для транслитерации

  var tripleLetters = [
    'shh'
  ];

  // Таблицы символов (за основу таблицы для латиницы берём таблицу для кириллицы)

  var symbolsTableEng = {};
  var symbolsTableRus = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'yo',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'й': 'j',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'cz',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'shh',
    'ъ': urlReady ? '' : '``',
    'ы': 'y',
    'ь': urlReady ? '' : '`',
    'э': urlReady ? 'e' : 'e`',
    'ю': 'yu',
    'я': 'ya'
  };

  for (var key in symbolsTableRus) {
    if (symbolsTableRus[key]) {
      symbolsTableEng[symbolsTableRus[key]] = key;
    }
  }

  // Добавляем в таблицу для латиницы случаи, которых нет в кириллической таблице

  symbolsTableEng['c'] = 'ц';
  symbolsTableEng['ts'] = 'ц';
  symbolsTableEng['ja'] = 'я';
  symbolsTableEng['ju'] = 'ю';
  symbolsTableEng['kh'] = 'х';

  var lettersReady = [];
  var lettersEdited = [];

  // Приводим текст к нижнему регистру

  enteredValue = enteredValue.toLowerCase().split('');

  enteredValue.map(function(letter, index){
    if (index > 0 &&
      (doubleLetters.indexOf(enteredValue[index-1] + enteredValue[index]) !== -1)) {
      lettersReady[index-1] = false;
      lettersReady[index] = enteredValue[index-1] + enteredValue[index];
    }
    else if (index > 1 &&
      (tripleLetters.indexOf(enteredValue[index-2] + enteredValue[index-1] + enteredValue[index]) !== -1)) {
      lettersReady[index-1] = lettersReady[index-2] = false;
      lettersReady[index] = enteredValue[index-2] + enteredValue[index-1] + enteredValue[index];
    }
    else {
      lettersReady.push(letter);
    }
  });

  // Проходим по таблицам, ищем совпадения символов, транслитерируем

  lettersReady.map(function(letter, index) {
    if (letter !== false) {
      if (symbolsTableRus[letter]) {
        lettersEdited.push(symbolsTableRus[letter]);
      }
      else if (symbolsTableEng[letter]) {
        lettersEdited.push(symbolsTableEng[letter]);
      }
      else if (letter === ' ') {
        lettersEdited.push(letter);
      }
    }
  });

  // Склеиваем строку, возвращаем

  return (lettersEdited.join(''));

};

module.exports = transliterateEngRu;