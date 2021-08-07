const elements = [];

export function addElement(oldPath, description) {
  let isContainer = false;
  const path = [...oldPath].reverse().reduce((acc, el) => {
    if (el.nodeName && el.nodeName !== '#document') {
      if (isContainer) {
        acc = acc + ' ' + el.localName;
      }
      if (el.getAttribute('tour-attribute')) {
        const attribute = el.getAttribute('tour-attribute');
        const att = '[tour-attribute="' + attribute + '"]';
        isContainer = true;
        acc = acc + att;
      }
    }
    return acc;
  }, '');
  elements.push({ path, description });
  addLocaleStorage();
  return console.log(elements);
}

function addLocaleStorage() {
  localStorage.setItem('elements', JSON.stringify(elements));
}
