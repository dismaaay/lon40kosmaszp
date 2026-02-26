function nwd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x || 1;
}

function skrocUlamki(licznik, mianownik) {
  const dzielnik = nwd(licznik, mianownik);
  let l = licznik / dzielnik;
  let m = mianownik / dzielnik;

  if (m < 0) {
    l *= -1;
    m *= -1;
  }

  return { licznik: l, mianownik: m };
}

function pobierzUlamki(ids) {
  const [n1, d1, n2, d2] = ids.map((id) => parseInt(document.getElementById(id).value, 10));

  if ([n1, d1, n2, d2].some((v) => Number.isNaN(v))) {
    return { error: 'Wpisz wszystkie liczby całkowite.' };
  }

  if (d1 === 0 || d2 === 0) {
    return { error: 'Mianownik nie może być równy 0.' };
  }

  return { n1, d1, n2, d2 };
}

function wypiszWynik(elementId, tresc, czyBlad = false) {
  const el = document.getElementById(elementId);
  el.textContent = tresc;
  el.classList.toggle('error', czyBlad);
}

function dodajUlamki() {
  const data = pobierzUlamki(['add_n1', 'add_d1', 'add_n2', 'add_d2']);
  if (data.error) {
    wypiszWynik('add_result', data.error, true);
    return;
  }

  const licznik = data.n1 * data.d2 + data.n2 * data.d1;
  const mianownik = data.d1 * data.d2;
  const wynik = skrocUlamki(licznik, mianownik);

  wypiszWynik('add_result', `${data.n1}/${data.d1} + ${data.n2}/${data.d2} = ${wynik.licznik}/${wynik.mianownik}`);
}

function odejmijUlamki() {
  const data = pobierzUlamki(['sub_n1', 'sub_d1', 'sub_n2', 'sub_d2']);
  if (data.error) {
    wypiszWynik('sub_result', data.error, true);
    return;
  }

  const licznik = data.n1 * data.d2 - data.n2 * data.d1;
  const mianownik = data.d1 * data.d2;
  const wynik = skrocUlamki(licznik, mianownik);

  wypiszWynik('sub_result', `${data.n1}/${data.d1} - ${data.n2}/${data.d2} = ${wynik.licznik}/${wynik.mianownik}`);
}
