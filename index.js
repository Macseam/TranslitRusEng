var translitRusEng = function(enteredValue = '', options = {}){
  var { slug, engToRus, lowerCase } = options

  // Проверяем, строковая ли переменная enteredValue
  var valueType = 'string';
  if (typeof enteredValue !== 'string') {
    if (Object.prototype.toString.call( enteredValue ) === '[object Array]') {
      valueType = 'array';
      enteredValue = enteredValue.join('%===% ');
    }
    else if (typeof enteredValue === 'object') {
      valueType = 'object';
    }
    else {
      enteredValue = enteredValue.toString();
    }
  }

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
    'e`',
    '``'
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
    'ъ': (slug && !engToRus) ? '' : '``',
    'ы': 'y',
    'ь': (slug && !engToRus) ? '' : '`',
    'э': (slug && !engToRus) ? 'e' : 'e`',
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

  // Приводим текст к нижнему регистру

  var convertLetters = function(enteredValue) {

    var lettersReady = [];
    var lettersEdited = [];

    enteredValue = lowerCase ? enteredValue.toLowerCase().split('') : enteredValue.split('');

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

    lettersReady.map(function(letter) {
      if (letter !== false) {
        var isUpperCase = letter === letter.toUpperCase();
        var loweredLetter = letter.toLowerCase();
        if (symbolsTableRus[loweredLetter] !== undefined && !engToRus) {
          var resultingLetter = isUpperCase ? symbolsTableRus[loweredLetter].toUpperCase() : symbolsTableRus[loweredLetter];
          lettersEdited.push(resultingLetter);
        }
        else if (symbolsTableEng[loweredLetter] && engToRus) {
          var resultingLetter = isUpperCase ? symbolsTableEng[loweredLetter].toUpperCase() : symbolsTableEng[loweredLetter];
          lettersEdited.push(resultingLetter);
        }
        else if (loweredLetter === ' ' && (slug && !engToRus)) {
          lettersEdited.push('_');
        }
        else {
          lettersEdited.push(letter);
        }
      }
    });

    return lettersEdited;
  };

  // Склеиваем строку, возвращаем

  if (valueType === 'array') {
    return (convertLetters(enteredValue).join('').split('%===%'));
  }
  else if (valueType === 'object') {
    for (var objKey in enteredValue) {
      if (enteredValue[objKey]) {
        enteredValue[objKey] = convertLetters(enteredValue[objKey]).join('');
      }
    }
    return (enteredValue);
  }
  else {
    return (convertLetters(enteredValue).join(''));
  }

};

module.exports = translitRusEng;
