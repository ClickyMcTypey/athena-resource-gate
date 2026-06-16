export function setFieldValue(field, value) {
  if (!field) return;

  const prototype = Object.getPrototypeOf(field);
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');

  if (descriptor?.set) {
    descriptor.set.call(field, value);
  } else {
    field.value = value;
  }

  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.dispatchEvent(new Event('change', { bubbles: true }));
}

export function getClosestElement(element, selector) {
  if (!element || !(element instanceof Element)) return null;

  return element.closest(selector);
}