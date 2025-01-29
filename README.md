# 🎬 Cinevibe – Interaktív Filmajánló Webalkalmazás

Egy interaktív webalkalmazás, amely segít a felhasználóknak felfedezni és rendszerezni a filmeket!

Cinevibe egy modern, interaktív webalkalmazás, amely segít a felhasználóknak új filmeket felfedezni és rendszerezni egy intuitív gesztusvezérelt rendszer segítségével. Az alkalmazás a The Movie Database (TMDb) API adataira épül, és a Google Firebase biztosítja az autentikációt és az adatbázis-kezelést.

A projekt célja, hogy megoldja a filmválasztás problémáját az egyre bővülő streaming platformok és hatalmas tartalomkínálat világában. Az intuitív kezelőfelület és a testreszabható szűrési lehetőségek révén a felhasználók gyorsan megtalálhatják az érdeklődésüknek megfelelő filmeket.

## 🚀 Főbb Funkciók

- Filmkártyás gesztusvezérlés – Jobbra húzás: tetszik, balra húzás: nem tetszik, felfelé húzás: kedvenc.
- Adaptív ajánlórendszer – Véletlenszerűen kiválasztott filmek, amelyeket a felhasználó előző preferenciái befolyásolhatnak.
- Szűrők – Filmhossz, értékelés, megjelenési év és műfaj szerinti szűrés.
- Felhasználói hitelesítés – Bejelentkezés Google-fiókkal vagy e-mail/jelszó párossal a Firebase Authentication segítségével.
- Kedvencek és tiltólista – A felhasználók elmenthetik és rendszerezhetik a kedvenc vagy mellőzni kívánt filmjeiket.
- Valós idejű adatbázis – A felhasználói adatok és filmpreferenciák Firestore adatbázisban tárolódnak és frissülnek.
- Dinamikus háttérszínek – Az aktuális film poszterének domináns színe alapján változó háttér.
- Reszponzív dizájn – Asztali és mobil eszközökön is optimalizált megjelenés.
- Sötét és adaptív téma – Felhasználó által választható megjelenítési módok.
- Egyedi töltőképernyő – Animált Cinevibe logó és dinamikus szövegmegjelenítés a jobb vizuális élményért.

## 🛠️ Technológiai Stack
- Frontend:
  - React
  - TypeScript
  - Vite
- Backend:
  - Firebase (Authentication, Firestore)
  - TMDb API

## 🔧 Telepítés és Futtatás
- 1️⃣ Klónozd a repót:

```js
git clone https://github.com/mozsikimre/cinevibe.git  
cd cinevibe
```
- 2️⃣ Telepítsd a szükséges függőségeket:

```js
npm install  
```

- 3️⃣ Hozz létre egy .env fájlt, és add hozzá a TMDb API kulcsot és Firebase konfigurációt:

```js
VITE_TMDB_API_KEY=your_tmdb_api_key  
VITE_FIREBASE_API_KEY=your_firebase_api_key  
# Add meg a többi Firebase konfigurációt is
```

- 4️⃣ Indítsd el a fejlesztői szervert:
```js
npm run dev
```
- 5️⃣ Nyisd meg az alkalmazást a böngésződben a következő címen: http://localhost:5173.

