# TranslitRusEng
### Transliteration script for rus-eng transitions and vice versa
### (ISO 9/ГОСТ 7.79 with a few improvements)
##### Usage:
##### import translitRusEng from 'translit-rus-eng';
##### translitRusEng (arg1, arg2)
##### arg1: string to transliterate (Russian or English)
##### arg2: optional flag to to remove apostrophes and make result url-friendly

---
Example:

`translitRusEng("Широкая электрификация южных губерний")`
> Result: "shirokaya e'lektrifikacziya yuzhnyh gubernij"

`translitRusEng("Широкая электрификация южных губерний", true)`
> Result: "shirokaya_elektrifikacziya_yuzhnyh_gubernij"