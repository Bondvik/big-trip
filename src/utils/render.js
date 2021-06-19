import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

//Создание DOM-элемента
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

//ф-я render будет работать не только с DOM-элементами,
//но и с компонентами
//и тогда передали компонент - сработает, передали DOM-элемент тоже сработает
export const render = (container, child, place) => {
  //если container или child - экземпляр класса Abstract
  if (container instanceof Abstract) {
    //чтобы получить DOM-элемент
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    //чтобы получить DOM-элемент
    child = child.getElement();
  }
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

//replacedNode = parentNode.replaceChild(newChild, oldChild);
export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
