# TranslitRusEng

Transliteration script for rus-eng and eng-rus transitions.

Based on [ISO 9/ГОСТ 7.79 standard](https://ru.wikipedia.org/wiki/ISO_9#.D0.A2.D0.B0.D0.B1.D0.BB._2._.D0.A2.D1.80.D0.B0.D0.BD.D1.81.D0.BB.D0.B8.D1.82.D0.B5.D1.80.D0.B0.D1.86.D0.B8.D1.8F_.D0.BF.D0.BE_.D1.81.D0.B8.D1.81.D1.82.D0.B5.D0.BC.D0.B5_.D0.91) (with a few improvements).

 * No dependencies, only 4Kb
 * Transliterate from Russian to English and vice versa

#### Usage:
 * import translitRusEng from 'translit-rus-eng';

---

#### Version 1.x.x:

 * translitRusEng (string, options)

> string: string/array/object values to transliterate (Russian or English)

> options: object, can include booleans 'engToRus', 'slug' (to make url-friendly slug-like strings) or 'lowerCase' (to force transliteration into lowercase)

---

#### Version 1.x.x examples:

```translitRusEng ("Kol`skij poluostrov", { engToRus: true }):```

> "Кольский полуостров"

```translitRusEng ("Широкая электрификация южных губерний", { slug: true }):```

> "shirokaya_elektrifikacziya_yuzhnyh_gubernij"

```translitRusEng ("Скушай ещё этих мягких булочек", { lowerCase: true }):```

> "skushaj eshhyo e`tih myagkih bulochek"

---

#### Version 2.x.x:

* translitRusEng (options)

> string: string value to transliterate (Russian or English, auto-selection of transliteration language)

> options: object, can include string 'target' for forced target language choice (possible values are "rus" and "eng") and boolean 'slugify' (to make url-friendly slug-like strings)

---

#### Version 2.x.x examples:

```translitRusEng ("Kol`skij poluostrov"):```

> "Кольский полуостров"

```translitRusEng ("Широкая электрификация южных губерний", { slugify: true }):```

> "shirokaya_elektrifikacziya_yuzhnyh_gubernij"

```translitRusEng ("Широкая электрификация южных губерний компанией Samsung", { target: 'eng' }):```

> "Shirokaya e`lektrifikacziya yuzhnyh gubernij kompaniej Samsung"

```translitRusEng ("Скушай ещё этих мягких булочек"):```

> "Skushaj eshhyo e`tih myagkih bulochek"
