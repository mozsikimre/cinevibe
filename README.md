# 🎬 Cinevibe – Interaktív Filmajánló Webalkalmazás

Egy interaktív webalkalmazás, amely segít a felhasználóknak felfedezni és rendszerezni a filmeket!

Cinevibe egy modern, interaktív webalkalmazás, amely segít a felhasználóknak új filmeket felfedezni és rendszerezni egy intuitív gesztusvezérelt rendszer segítségével. Az alkalmazás a **The Movie Database (TMDb) API** adataira épül, és a **Google Firebase** biztosítja az autentikációt és az adatbázis-kezelést.

A projekt célja, hogy megoldja a filmválasztás problémáját az egyre bővülő streaming platformok és hatalmas tartalomkínálat világában. Az intuitív kezelőfelület és a testreszabható szűrési lehetőségek révén a felhasználók gyorsan megtalálhatják az érdeklődésüknek megfelelő filmeket.

![Main-container](https://github.com/user-attachments/assets/208ad45e-8999-4c08-a95f-790987376288)

## 🚀 Főbb Funkciók

- **Filmkártyás gesztusvezérlés** – Jobbra húzás: tetszik, balra húzás: nem tetszik, felfelé húzás: kedvenc.
- **Adaptív ajánlórendszer** – Véletlenszerűen kiválasztott filmek, amelyeket a felhasználó előző preferenciái befolyásolhatnak.
- **Szűrők** – Filmhossz, értékelés, megjelenési év és műfaj szerinti szűrés.
- **Felhasználói hitelesítés** – Bejelentkezés Google-fiókkal vagy e-mail/jelszó párossal a Firebase Authentication segítségével.
- **Kedvencek és tiltólista** – A felhasználók elmenthetik és rendszerezhetik a kedvenc vagy mellőzni kívánt filmjeiket.
- **Valós idejű adatbázis** – A felhasználói adatok és filmpreferenciák Firestore adatbázisban tárolódnak és frissülnek.
- **Dinamikus háttérszínek** – Az aktuális film poszterének domináns színe alapján változó háttér.
- **Reszponzív dizájn** – Asztali és mobil eszközökön is optimalizált megjelenés.
- **Sötét és adaptív téma** – Felhasználó által választható megjelenítési módok.
- **Egyedi töltőképernyő** – Animált Cinevibe logó és dinamikus szövegmegjelenítés a jobb vizuális élményért.

![Card-1](https://github.com/user-attachments/assets/ea7df17f-bcec-44c1-a8d3-4835afbc728b)
![Card-2](https://github.com/user-attachments/assets/c1cdf5b9-7acf-4864-aa21-3214e921b892)
![Swipe](https://github.com/user-attachments/assets/f973b187-50d8-45d6-882d-647296138258)
![Right_container](https://github.com/user-attachments/assets/cd83df68-4dd5-4722-be15-927717f6c4f6)
![Left_container](https://github.com/user-attachments/assets/91df7bd2-d28d-421e-8308-3e377db336d2)

## 🛠️ Technológiai Stack
- Frontend:
  - React
  - TypeScript
  - Vite
- Backend:
  - Firebase (Authentication, Firestore)
  - TMDb API
  
![DB](https://github.com/user-attachments/assets/8d10ef91-1691-498f-9885-81ad5c6144d1)
![Auth](https://github.com/user-attachments/assets/ede79677-74d0-4c08-9bcb-ea9724fa7d7c)

## 🔧 Telepítés és Futtatás
#### 1️⃣ Klónozd a repót:

```js
git clone https://github.com/mozsikimre/cinevibe.git  
cd cinevibe
```
#### 2️⃣ Telepítsd a szükséges függőségeket:

```js
npm install  
```

#### 3️⃣ Hozz létre egy .env fájlt, és add hozzá a TMDb API kulcsot és Firebase konfigurációt:

```js
VITE_TMDB_API_KEY=your_tmdb_api_key  
VITE_FIREBASE_API_KEY=your_firebase_api_key  
# Add meg a többi Firebase konfigurációt is
```

#### 4️⃣ Indítsd el a fejlesztői szervert:
```js
npm run dev
```
#### 5️⃣ Nyisd meg az alkalmazást a böngésződben localhost segítségével.

## ⛓️ Kipróbálás
Az alábbi link megnyitásával kipróbálható az alkalmazás.
 - [Indítás](https://cinevibe.onrender.com/) *Jelenleg telefonon történő használat optimalizálás alatt van.*
   
## 🚀 Rólam
#### 👋 Üdvözöllek!
Mérnökinformatikus hallgató vagyok a Debreceni Egyetemen, aki elkötelezett a tanulásban és az előrehaladásban. Ambícióim magasak, és szenvedélyesen érdekel a webes alkalmazások fejlesztése. Tapasztalatom főleg a Front End területén van, de nyitott vagyok a Back End kihívásaira is. Csapatjátékosnak tartom magam, és könnyen alkalmazkodom új környezetekhez és technológiákhoz. Alapszinten jártas vagyok Java és C# nyelvekben, és izgatottan várom a lehetőségeket az ezeken a területeken való fejlődésre és alkalmazásra.
