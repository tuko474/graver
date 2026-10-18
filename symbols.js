/* Библиотека символов для гравировки: разделы (вложенные), стартовый набор символов и общие функции.
   В демо данные хранятся в браузере; в рабочей версии — на сервере. */
(function () {
  const KEY = 'graver-symbols-v1';

  /* ---------- Генераторы листьев для венка и ветви ---------- */
  const f = n => n.toFixed(1);
  function leaf(x, y, ang) {
    const r = ang * Math.PI / 180, cx = x + 7 * Math.cos(r), cy = y + 7 * Math.sin(r);
    return `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="7.5" ry="3.2" transform="rotate(${ang.toFixed(0)} ${f(cx)} ${f(cy)})" fill="currentColor" stroke="none"/>`;
  }
  function leavesArc(cx, cy, r, a0, a1, n) {
    let s = '';
    const dir = a1 > a0 ? 90 : -90;
    for (let i = 0; i < n; i++) {
      const a = a0 + (a1 - a0) * i / (n - 1), rad = a * Math.PI / 180;
      const x = cx + r * Math.cos(rad), y = cy + r * Math.sin(rad), t = a + dir;
      s += leaf(x, y, t - 38) + leaf(x, y, t + 38);
    }
    return s;
  }
  function leavesQuad(p0, p1, p2, ts) {
    let s = '';
    ts.forEach(t => {
      const u = 1 - t;
      const x = u * u * p0[0] + 2 * t * u * p1[0] + t * t * p2[0];
      const y = u * u * p0[1] + 2 * t * u * p1[1] + t * t * p2[1];
      const dx = 2 * u * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
      const dy = 2 * u * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
      const a = Math.atan2(dy, dx) * 180 / Math.PI;
      s += leaf(x, y, a - 40) + leaf(x, y, a + 40);
    });
    return s;
  }
  const pt = (a, r) => [50 + r * Math.cos(a * Math.PI / 180), 50 + r * Math.sin(a * Math.PI / 180)];
  const W1 = pt(98, 34), W2 = pt(250, 34), W3 = pt(82, 34), W4 = pt(-70, 34);
  const gearTeeth = [0, 45, 90, 135, 180, 225, 270, 315].map(a => `<rect x="44" y="8" width="12" height="13" rx="2" fill="currentColor" stroke="none" transform="rotate(${a} 50 50)"/>`).join('');
  const snowArm = '<path d="M50 12V88M50 24L41 15M50 24L59 15M50 76L41 85M50 76L59 85"/>';

  /* ---------- Разделы: parent = null — верхний уровень ---------- */
  const sections = [
    { id: 'sport', name: 'Спорт', parent: null },
    { id: 'football', name: 'Футбол', parent: 'sport' },
    { id: 'hockey', name: 'Хоккей', parent: 'sport' },
    { id: 'athletics', name: 'Лёгкая атлетика', parent: 'sport' },
    { id: 'swim', name: 'Плавание', parent: 'sport' },
    { id: 'holidays', name: 'Праздники', parent: null },
    { id: 'jubilee', name: 'Юбилеи', parent: 'holidays' },
    { id: 'newyear', name: 'Новый год', parent: 'holidays' },
    { id: 'spring', name: '23 Февраля и 8 Марта', parent: 'holidays' },
    { id: 'corp', name: 'Корпоративное', parent: null },
    { id: 'prof', name: 'Профессии', parent: 'corp' },
    { id: 'medicine', name: 'Медицина', parent: 'prof' },
    { id: 'industry', name: 'Производство', parent: 'prof' },
    { id: 'education', name: 'Образование', parent: 'prof' },
    { id: 'achieve', name: 'Достижения', parent: 'corp' },
    { id: 'frames', name: 'Рамки и орнаменты', parent: null }
  ];

  /* ---------- Символы: svg — содержимое viewBox 0 0 100 100, обводка 4 ---------- */
  const items = [
    { id: 's-ball', name: 'Футбольный мяч', section: 'football',
      svg: '<circle cx="50" cy="50" r="38"/><path d="M50 37L62.4 46L57.6 60.5H42.4L37.6 46Z" fill="currentColor"/><path d="M50 37V12M62.4 46L86 38.3M57.6 60.5L72.3 80.7M42.4 60.5L27.7 80.7M37.6 46L14 38.3"/>' },
    { id: 's-goal', name: 'Ворота', section: 'football',
      svg: '<path d="M8 76H92M16 76V28H84V76"/><path d="M33 28V76M50 28V76M67 28V76M16 44H84M16 60H84" stroke-width="2"/>' },
    { id: 's-whistle', name: 'Свисток', section: 'football',
      svg: '<circle cx="38" cy="60" r="20"/><path d="M38 40H86V54H56"/><circle cx="38" cy="60" r="5" fill="currentColor"/><path d="M22 30L14 22"/>' },
    { id: 's-sticks', name: 'Клюшки', section: 'hockey',
      svg: '<path d="M26 12L62 76Q66 86 82 84M74 12L38 76Q34 86 18 84"/><ellipse cx="50" cy="90" rx="10" ry="4" fill="currentColor" stroke="none"/>' },
    { id: 's-puck', name: 'Шайба', section: 'hockey',
      svg: '<ellipse cx="50" cy="42" rx="34" ry="13"/><path d="M16 42V58Q16 71 50 71Q84 71 84 58V42"/><path d="M30 26L22 14M50 22V8M70 26L78 14" stroke-width="3"/>' },
    { id: 's-stopwatch', name: 'Секундомер', section: 'athletics',
      svg: '<circle cx="50" cy="57" r="32"/><path d="M42 12H58M50 12V25M76 30L82 24M50 57V37M50 57L63 65"/>' },
    { id: 's-finish', name: 'Финишный флаг', section: 'athletics',
      svg: '<path d="M24 90V12"/><path d="M24 14H80V50H24"/><path d="M24 14h11v12H24zM46 14h11v12H46zM68 14h12v12H68zM35 26h11v12H35zM57 26h11v12H57zM24 38h11v12H24zM46 38h11v12H46zM68 38h12v12H68z" fill="currentColor" stroke="none"/>' },
    { id: 's-waves', name: 'Волны', section: 'swim',
      svg: '<circle cx="66" cy="22" r="8" fill="currentColor" stroke="none"/><path d="M20 40Q38 28 58 34"/><path d="M10 54q10-10 20 0t20 0t20 0t20 0M10 70q10-10 20 0t20 0t20 0t20 0M10 86q10-10 20 0t20 0t20 0t20 0"/>' },
    { id: 's-wreath', name: 'Лавровый венок', section: 'jubilee',
      svg: `<path d="M${f(W1[0])} ${f(W1[1])}A34 34 0 0 1 ${f(W2[0])} ${f(W2[1])}M${f(W3[0])} ${f(W3[1])}A34 34 0 0 0 ${f(W4[0])} ${f(W4[1])}" stroke-width="3"/>${leavesArc(50, 50, 34, 104, 244, 6)}${leavesArc(50, 50, 34, 76, -64, 6)}<path d="M42 92L50 84L58 92" stroke-width="3"/>` },
    { id: 's-ribbon', name: 'Лента-вымпел', section: 'jubilee',
      svg: '<path d="M18 32H82V58H18Z"/><path d="M18 40H6L13 51L6 62H26V58M82 40H94L87 51L94 62H74V58"/><path d="M30 45H70" stroke-width="3"/>' },
    { id: 's-glasses', name: 'Бокалы', section: 'jubilee',
      svg: '<g transform="rotate(-14 34 52)"><path d="M24 22H44L41 48Q34 56 27 48Z"/><path d="M34 54V80M26 82H42"/></g><g transform="rotate(14 66 52)"><path d="M56 22H76L73 48Q66 56 59 48Z"/><path d="M66 54V80M58 82H74"/></g><path d="M50 6V16M45 11H55M20 10L24 14M80 10L76 14" stroke-width="3"/>' },
    { id: 's-snowflake', name: 'Снежинка', section: 'newyear',
      svg: `${snowArm}<g transform="rotate(60 50 50)">${snowArm}</g><g transform="rotate(120 50 50)">${snowArm}</g>` },
    { id: 's-tree', name: 'Ёлка', section: 'newyear',
      svg: '<path d="M50 14L30 40H40L22 64H42V82H58V64H78L60 40H70Z"/><path d="M50 4L52.5 9.5L58 10L54 14L55 19.5L50 17L45 19.5L46 14L42 10L47.5 9.5Z" fill="currentColor" stroke-width="1.5"/>' },
    { id: 's-star', name: 'Звезда', section: 'spring',
      svg: '<path d="M50 12L59.4 39.1L88 39.6L65.2 56.9L73.5 84.4L50 68L26.5 84.4L34.8 56.9L12 39.6L40.6 39.1Z"/><path d="M50 30L54.7 43.6L69 43.8L57.6 52.4L61.8 66.2L50 58L38.2 66.2L42.4 52.4L31 43.8L45.3 43.6Z" fill="currentColor" stroke="none"/>' },
    { id: 's-tulip', name: 'Тюльпан', section: 'spring',
      svg: '<path d="M34 22L42 38L50 24L58 38L66 22Q72 54 50 60Q28 54 34 22Z"/><path d="M50 60V92"/><path d="M50 84Q32 82 26 62Q44 64 50 80Z" fill="currentColor" stroke-width="2"/>' },
    { id: 's-cross', name: 'Медицинский крест', section: 'medicine',
      svg: '<path d="M39 12H61V39H88V61H61V88H39V61H12V39H39Z"/>' },
    { id: 's-heart', name: 'Сердце с пульсом', section: 'medicine',
      svg: '<path d="M50 86C18 64 8 42 20 26C30 14 45 18 50 32C55 18 70 14 80 26C92 42 82 64 50 86Z"/><path d="M22 50H38L44 38L52 64L58 48H78" stroke-width="3"/>' },
    { id: 's-gear', name: 'Шестерёнка', section: 'industry',
      svg: `${gearTeeth}<circle cx="50" cy="50" r="29"/><circle cx="50" cy="50" r="11"/>` },
    { id: 's-hammer', name: 'Молоток', section: 'industry',
      svg: '<path d="M24 14H66V32H24Z" fill="currentColor"/><path d="M66 18Q80 18 84 28" /><path d="M41 32H49V88H41Z"/>' },
    { id: 's-book', name: 'Открытая книга', section: 'education',
      svg: '<path d="M50 28Q32 16 10 22V80Q32 74 50 84Q68 74 90 80V22Q68 16 50 28Z"/><path d="M50 28V84M20 36Q32 33 42 39M20 50Q32 47 42 53M58 39Q68 33 80 36M58 53Q68 47 80 50" stroke-width="2.5"/>' },
    { id: 's-globe', name: 'Глобус', section: 'education',
      svg: '<circle cx="50" cy="50" r="36"/><ellipse cx="50" cy="50" rx="15" ry="36"/><path d="M14 50H86M20 31Q50 38 80 31M20 69Q50 62 80 69" stroke-width="3"/>' },
    { id: 's-cup', name: 'Кубок', section: 'achieve',
      svg: '<path d="M30 14H70V34Q70 58 50 60Q30 58 30 34Z"/><path d="M30 22H17Q15 44 32 46M70 22H83Q85 44 68 46M50 60V74"/><path d="M33 76H67V88H33Z" fill="currentColor"/>' },
    { id: 's-medal', name: 'Медаль', section: 'achieve',
      svg: '<path d="M30 8L42 44M70 8L58 44M30 8H44L50 26M70 8H56L50 26"/><circle cx="50" cy="66" r="24"/><path d="M50 52L54 61L64 62L56.5 68.5L59 78L50 73L41 78L43.5 68.5L36 62L46 61Z" fill="currentColor" stroke-width="1.5"/>' },
    { id: 's-crown', name: 'Корона', section: 'achieve',
      svg: '<path d="M18 76L12 32L32 50L50 20L68 50L88 32L82 76Z"/><path d="M18 88H82"/><circle cx="12" cy="28" r="4" fill="currentColor"/><circle cx="50" cy="15" r="4" fill="currentColor"/><circle cx="88" cy="28" r="4" fill="currentColor"/>' },
    { id: 's-order', name: 'Орден', section: 'achieve',
      svg: '<circle cx="50" cy="50" r="40" stroke-width="3"/><circle cx="50" cy="50" r="33" stroke-width="2"/><path d="M50 22L57 41.5L78 42L61.5 54.5L67.5 74.5L50 63L32.5 74.5L38.5 54.5L22 42L43 41.5Z" fill="currentColor" stroke-width="1.5"/>' },
    { id: 's-branch', name: 'Лавровая ветвь', section: 'frames',
      svg: `<path d="M16 86Q46 60 80 18" stroke-width="3"/>${leavesQuad([16, 86], [46, 60], [80, 18], [0.2, 0.38, 0.56, 0.74, 0.9])}${leaf(80, 18, -55)}` },
    { id: 's-cartouche', name: 'Рамка-картуш', section: 'frames',
      svg: '<path d="M24 12H76Q76 24 88 24V76Q76 76 76 88H24Q24 76 12 76V24Q24 24 24 12Z"/><rect x="24" y="24" width="52" height="52" rx="3" stroke-width="2"/>' },
    { id: 's-corner', name: 'Угловой орнамент', section: 'frames',
      svg: '<path d="M12 88V42Q12 12 42 12H88"/><path d="M24 88V48Q24 24 48 24H88" stroke-width="2.5"/><path d="M36 50Q36 36 50 36Q60 36 60 46Q60 54 52 54Q46 54 46 48" stroke-width="3"/><circle cx="88" cy="12" r="4" fill="currentColor"/><circle cx="12" cy="88" r="4" fill="currentColor"/>' }
  ];
  const SEED = { sections, items };
  const clone = o => JSON.parse(JSON.stringify(o));

  function valid(d) { return d && Array.isArray(d.sections) && Array.isArray(d.items); }
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) { const d = JSON.parse(raw); if (valid(d)) return d; } } catch (e) { /* хранилище недоступно */ }
    return clone(SEED);
  }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; } }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) { /* ничего */ } return clone(SEED); }

  /* Разметка символа. color — цвет линий (для гравировки — светлый), size — размер в px для картинки */
  function svgMarkup(item, color, size) {
    const dims = size ? ` width="${size}" height="${size}"` : '';
    const col = color ? ` color="${color}"` : '';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"${dims}${col} fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${item.svg}</svg>`;
  }
  /* Адрес картинки: для загруженных — сама картинка, для встроенных — SVG нужного цвета */
  function imageSrc(item, color) {
    if (item.src) return item.src;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup(item, color || '#f5f9ff', 512));
  }

  window.LIB = { load, save, reset, svgMarkup, imageSrc };
})();
