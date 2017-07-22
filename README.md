# TranslitRusEng

Transliteration script for rus-eng and eng-rus transitions.

Based on [ISO 9/ГОСТ 7.79 standard](https://ru.wikipedia.org/wiki/ISO_9#.D0.A2.D0.B0.D0.B1.D0.BB._2._.D0.A2.D1.80.D0.B0.D0.BD.D1.81.D0.BB.D0.B8.D1.82.D0.B5.D1.80.D0.B0.D1.86.D0.B8.D1.8F_.D0.BF.D0.BE_.D1.81.D0.B8.D1.81.D1.82.D0.B5.D0.BC.D0.B5_.D0.91) (with a few improvements).

 * No dependencies, only 4Kb
 * Transliterate from Russian to English and vice versa

#### Usage:
import translitRusEng from 'translit-rus-eng';

translitRusEng (arg1, arg2)

> arg1: string/array/object values to transliterate (Russian or English)

> arg2: optional flag, can be 'rusToEng', 'engToRus', or 'slug' (to make url-friendly slug-like strings)

---

#### Examples:

translitRusEng ("yozhik igol`chatyj", 'engToRus'):

```
"ёжик игольчатый"
```

translitRusEng ("Широкая электрификация южных губерний", 'slug'):

```
"shirokaya_elektrifikacziya_yuzhnyh_gubernij"
```
