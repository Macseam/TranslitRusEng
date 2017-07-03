# TranslitRusEng
Transliteration script for rus-eng transitions and vice versa (ISO 9/ГОСТ 7.79 with a few improvements)
Usage: transliterateEngRu (stringToTransliterate, [optional: true to remove apostrophes])

Example:
transliterateEngRu('Широкая электрификация южных губерний даст мощный толчок подъёму сельского хозяйства') = 'shirokaya e`lektrifikacziya yuzhnyh gubernij dast moshhnyj tolchok pod``yomu sel`skogo hozyajstva'
transliterateEngRu('Широкая электрификация южных губерний даст мощный толчок подъёму сельского хозяйства' ,true) = 'shirokaya elektrifikacziya yuzhnyh gubernij dast moshhnyj tolchok podyomu selskogo hozyajstva'