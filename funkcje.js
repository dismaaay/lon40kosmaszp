function pokazWynik(idPole, idObw, tekstPole, tekstObw, czyBlad = false) {
  const poleEl = document.getElementById(idPole);
  const obwEl = document.getElementById(idObw);

  poleEl.textContent = tekstPole;
  obwEl.textContent = tekstObw;

  poleEl.style.display = 'block';
  obwEl.style.display = 'block';

  poleEl.classList.toggle('blad', czyBlad);
  obwEl.classList.toggle('blad', czyBlad);
}

function pobierzLiczbe(id) {
  return parseFloat(document.getElementById(id).value);
}

function obliczPr() {
  const a = pobierzLiczbe('pr_a');
  const b = pobierzLiczbe('pr_b');

  if (Number.isNaN(a) || Number.isNaN(b) || a <= 0 || b <= 0) {
    pokazWynik('p_polePr', 'p_obwPr', 'Podaj dodatnie liczby.', '');
    return;
  }

  const pole = a * b;
  const obw = 2 * a + 2 * b;
  pokazWynik('p_polePr', 'p_obwPr', `Pole prostokąta = ${pole.toFixed(2)}`, `Obwód prostokąta = ${obw.toFixed(2)}`);
}

function obliczTrojkat() {
  const a = pobierzLiczbe('tr_a');
  const b = pobierzLiczbe('tr_b');
  const c = pobierzLiczbe('tr_c');
  const h = pobierzLiczbe('tr_h');

  if ([a, b, c, h].some((val) => Number.isNaN(val) || val <= 0)) {
    pokazWynik('p_poleTr', 'p_obwTr', 'Podaj dodatnie liczby.', '');
    return;
  }

  const pole = (a * h) / 2;
  const obw = a + b + c;
  pokazWynik('p_poleTr', 'p_obwTr', `Pole trójkąta = ${pole.toFixed(2)}`, `Obwód trójkąta = ${obw.toFixed(2)}`);
}

function obliczKolo() {
  const r = pobierzLiczbe('k_r');

  if (Number.isNaN(r) || r <= 0) {
    pokazWynik('p_poleK', 'p_obwK', 'Podaj dodatnią liczbę.', '');
    return;
  }

  const pole = Math.PI * r * r;
  const obw = 2 * Math.PI * r;
  pokazWynik('p_poleK', 'p_obwK', `Pole koła = ${pole.toFixed(2)}`, `Obwód koła = ${obw.toFixed(2)}`);
}

function obliczTrapez() {
  const a = pobierzLiczbe('t_a');
  const b = pobierzLiczbe('t_b');
  const c = pobierzLiczbe('t_c');
  const d = pobierzLiczbe('t_d');
  const h = pobierzLiczbe('t_h');

  if ([a, b, c, d, h].some((val) => Number.isNaN(val) || val <= 0)) {
    pokazWynik('p_poleT', 'p_obwT', 'Podaj dodatnie liczby.', '');
    return;
  }

  const pole = ((a + b) * h) / 2;
  const obw = a + b + c + d;
  pokazWynik('p_poleT', 'p_obwT', `Pole trapezu = ${pole.toFixed(2)}`, `Obwód trapezu = ${obw.toFixed(2)}`);
}
