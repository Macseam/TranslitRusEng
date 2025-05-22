const translitRusEng = (enteredValue, slugify) => {

  // Кириллическая таблица символов
  const symbolsTableRus = {
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
    'ъ': '``',
    'ы': 'y',
    'ь': '`',
    'э': 'e`',
    'ю': 'yu',
    'я': 'ya',
  };

  // Небольшие дополнения для таблицы символов латиницы
  const symbolsTableEng = {
    'c': 'ц',
    'ts': 'ц',
    'ja': 'я',
    'ju': 'ю',
    'kh': 'х',
  };

  // В остальном таблицу символов латиницы берем из кириллической таблицы
  for (let key in symbolsTableRus) {
    if (symbolsTableRus[key]) {
      symbolsTableEng[symbolsTableRus[key]] = key;
    }
  }

  // Если тип данных строка - разбиваем строку на символы, если нет - приводим к строке и разбиваем
  const splitLetters = Object.prototype.toString.call(enteredValue) === 'string'
    ? [...enteredValue]
    : [...`${enteredValue}`];

  // Счетчик пропуска обработки символов для составных букв
  let skipIndexes = 0;

  const result = splitLetters.map((letter, index) => {
    if (skipIndexes > 0) {
      skipIndexes--;
      return;
    }

    // Запоминаем регистр символа
    const isUpperCase = letter === letter.toUpperCase();

    const secondLetter = splitLetters[index + 1] || '';
    const thirdLetter = splitLetters[index + 2] || '';

    // Ищем совпадения по тройным, двойным и одинарным буквам
    const letterLowered = letter.toLowerCase();
    const doubleLetter = letter.toLowerCase() + secondLetter.toLowerCase();
    const tripleLetter = letter.toLowerCase() + secondLetter.toLowerCase() + thirdLetter.toLowerCase();

    // Ищем совпадения сначала в кириллице, потом в латинице
    const foundInTables = (value) => symbolsTableRus[value] || symbolsTableEng[value];
    const foundLetters = foundInTables(tripleLetter) || foundInTables(doubleLetter) || foundInTables(letterLowered);

    // Если найдена составная буква, обрабатываем ее целиком, обработку отдельных ее символов пропускаем
    if (foundInTables(tripleLetter)) {
      skipIndexes += 2;
    } else if (foundInTables(doubleLetter)) {
      skipIndexes += 1;
    }

    // Если символ это пробел или символ не встречается в таблицах, выводим как есть
    const letterTransliterated = (letter === ' ' || !foundLetters) ? letter : foundLetters;

    // Возвращаем регистр символа, если необходимо (если буква составная, то только первому символу)
    if (isUpperCase) {
      if (letterTransliterated.length > 1) {
        return letterTransliterated.charAt(0).toUpperCase() + letterTransliterated.slice(1);
      }
      return letterTransliterated.toUpperCase();
    }

    return letterTransliterated;
  });

  // Склеиваем символы, удаляем лишние пробелы
  const resultJoined = result.join('');
  const resultTrimmed = resultJoined.trim().replace(/\s\s+/g, ' ');

  // Для slugify пробелы заменяем на подчеркивания, удаляем спецсимволы
  const resultSlugified = resultTrimmed
    .replace(/[^a-zA-Z0-9_-`]+/g, '_')
    .replace(/`+/g, '')
    .replace(/_+/g, '_');
  const finalResult = slugify ? resultSlugified : resultTrimmed;

  // Пустые значения выводим как есть, для строк выводим результат
  return (enteredValue === null || enteredValue === undefined) ? enteredValue : finalResult;

}

module.exports = translitRusEng;
