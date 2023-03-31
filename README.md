# Aplikacija sa tabelama u React.js-u

Ova aplikacija omogućava korisnicima da dodaju i uređuju podatke u tabelama, te da te podatke sprema u localStorage.

## Struktura tabele

Tabele se dodaju kroz kreiranje objekata direktno u kodu za svaku tabelu u nizu `tables`. Svaka tabela mora sadržavati `id` , `tableName` i `columns` vrijednost.

`Columns` key mora biti niz koji će sadržavati objekte koji predstavljaju svaki po jednu kolonu.

Svaka kolona mora imati sljedeće vrijednosti:

- `id` - unikatan id, za svaku tabelu se mora razlikovati kako bi se tabele prepoznale,
- `type`- (predstavlja vrstu inputa u tabeli, tj. da li je to text, number ili date),
- `name` - (ime kolone koje će se prikazati),
- `placeholder` - koji će biti prikazan za svako prazno polje koje je vezano za tu kolonu,
- `disabled` - (boolean vrijednost koja označava da li je polje onemogućeno) i "filterName" vrijednost.

Kada se tabela inicijalizira i postave sve potrebne kolone, potrebno je bilo gdje u kodu pozvati `<Table />` komponentu sa props vrijednoscu `table` preko koje ce biti proslijeđena ta nova tabela koju smo kreirali. Pozivanje komponente bi trebalo izgledati ovako:

`<Table table={tables[0]} />`

Ovim pozivom se prikazuje prva tabela iz niza tabela.

## Filter tabela

Za svaku tabelu je moguće kreirati filter. Filter komponenta je odvojena komponenta koju možemo renderovati bilo gdje u kodu i povezati sa tabelom koju želimo filtrirati. Kada pozovemo komponentu `<FilterTable table={tables[0]} />`, kreiramo filter za tabelu koja se u nizu `tables` nalazi na prvom mjestu. Klikom na dugme **Poništi** ponistavamo sve filtere i prikazujemo cijeli niz.

## Sortiranje tabela

Tabelu je moguće sortirati klikom na ime kolone. Kada se jednom klikne na ime kolone, kolona se sortira uzlazno, a drugi put tabela se sortira silazno.
