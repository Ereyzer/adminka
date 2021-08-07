import React, { useState, useEffect } from 'react';
// import { ThemeContext } from './Example2';

export function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // Оновлюємо заголовок документа, використовуючи API браузера
    document.title = `Ви натиснули ${count} разів`;
  });
  return (
    <div>
      <p>Ви натиснули {count} разів</p>
      <button onClick={() => setCount(count + 1)}>Натисни мене</button>
    </div>
  );
}

// export function Example() {
//   return (
//     <ThemeContext.Provider value={themes.dark}>
//       <Toolbar />
//     </ThemeContext.Provider>
//   );
// }

// function Toolbar(props) {
//   return (
//     <div>
//       <ThemedButton />
//     </div>
//   );
// }

// function ThemedButton() {
//   const theme = useContext(ThemeContext);
//   // const handleClick = () => {theme = }
//   return (
//     <button
//       style={{ background: theme.background, color: theme.foreground }}
//       onClick={handleClick}
//     >
//       I am styled by theme context!
//     </button>
//   );
// }
