# Cinevibe 🎥

Egy interaktív webalkalmazás, amely segít a felhasználóknak felfedezni és rendszerezni a filmeket!

## Főbb funkciók

- Filmajánló rendszer: Gesztusvezérlésen alapuló filmkártyák, amelyek segítségével a felhasználók tetszést, nemtetszést vagy kiemelést jelezhetnek.
- Szűrők: Szűrés műfaj, értékelés, játékidő, és megjelenési év szerint.
- Firebase integráció: Felhasználói autentikáció (e-mail, Google), adatbázis a kedvelt, nem kedvelt, és kiemelt filmek tárolására.
- Testreszabhatóság: Adaptív és sötét téma támogatása.
- Dinamikus háttér: A film poszterének színei alapján változó háttér.
- Töltőképernyő: Animált logó és szöveg a márkaerősítés érdekében.

## Technológiai stack
- Frontend:
  - React
  - TypeScript
  -Vite
- Backend:
  - Firebase (Authentication, Firestore)
  - TMDb API

##Telepítés és futtatás
- 1. Klónozd a repót:

```js
git clone https://github.com/<felhasználónév>/cinevibe.git  
cd cinevibe
```
- 2. Telepítsd a szükséges függőségeket:

```js
npm install  
```

- 3. Hozz létre egy .env fájlt, és add hozzá a TMDb API kulcsot és Firebase konfigurációt:

```js
VITE_TMDB_API_KEY=your_tmdb_api_key  
VITE_FIREBASE_API_KEY=your_firebase_api_key  
# Add meg a többi Firebase konfigurációt is
```

- 4. Indítsd el a fejlesztői szervert:
```js
npm run dev
```
- 5. Nyisd meg az alkalmazást a böngésződben a következő címen: http://localhost:5173.

