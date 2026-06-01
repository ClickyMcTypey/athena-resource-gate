export function setFieldValue(field, value) {
  if (!field) return;

  field.value = value;

  field.dispatchEvent(new Event('input', { bubbles: true }));
  field.dispatchEvent(new Event('change', { bubbles: true }));
}

export function getClosestElement(element, selector) {
  if (!element || !(element instanceof Element)) return null;

  return element.closest(selector);
}