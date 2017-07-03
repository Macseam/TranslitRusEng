# TranslitRusEng
### Transliteration script for rus-eng transitions and vice versa
### (ISO 9/ГОСТ 7.79 with a few improvements)
Usage: transliterateEngRu(stringToTransliterate, [optional: send true as a second agrument to remove apostrophes and make result url-friendly])

---
Example:

`translitRusEng("Широкая электрификация южных губерний")`
> Result: "shirokaya e'lektrifikacziya yuzhnyh gubernij"

`translitRusEng("Широкая электрификация южных губерний", true)`
> Result: "shirokaya elektrifikacziya yuzhnyh gubernij"