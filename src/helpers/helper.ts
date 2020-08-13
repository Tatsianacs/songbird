export function getRandomElements(arr: Array<any>, qty = 1): Array<any> {
  if (!arr || arr.length < qty) {
    return [];
  }
  let result = [];
  while (result.length < qty) {
    let el = getRandomElement(arr);
    if (result.indexOf(el) < 0) {
      result.push(el);
    }
  }
  return result;
}

export function getRandomElement(arr: Array<any>): any {
  return arr[getRandomInt(0, arr.length)];
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
