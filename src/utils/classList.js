export const classList = (baseClass, modificatorObject = {}, otherClasses = []) => {
  const list = [baseClass]

  for (let property in modificatorObject) {
    if (modificatorObject[property]) {
      list.push(`${baseClass}--${property}`)
    }
  }

  return list.join(" ") + " " + otherClasses.join(" ")
}
