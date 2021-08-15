// import { TourBackdrop } from '../TourBackdropBtns/TourBackdrop';
// function runOnKeys(func, ...codes) {
//     let pressed = new Set();

//     document.addEventListener('keydown', function (event) {
//       pressed.add(event.code);

//       for (let code of codes) {
//         // все ли клавиши из набора нажаты?
//         if (!pressed.has(code)) {
//           return;
//         }
//       }

//       pressed.clear();
//       console.log(TourBackdrop.changeIsAdmin());
//       func();
//     });

//     document.addEventListener('keyup', function (event) {
//       pressed.delete(event.code);
//     });
//   }

//   runOnKeys(() => alert('Привет!'), 'KeyL', 'KeyS', 'KeyD');
