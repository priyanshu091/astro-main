const Astronomy = require('astronomy-engine');
const date = new Date('2026-07-09T00:00:00+05:30');
const observer = new Astronomy.Observer(26.8467, 80.9462, 0);
const rise = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, +1, date, 1);
const set = Astronomy.SearchRiseSet(Astronomy.Body.Sun, observer, -1, date, 1);
console.log('Rise:', rise.date);
console.log('Set:', set.date);
