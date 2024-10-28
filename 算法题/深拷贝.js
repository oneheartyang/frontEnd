const deepClone = (obj) => {
  if (obj === null) return null;
  if (typeof obj !== "object") return obj;

  const clone = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (typeof obj[key] === "object") {
      clone[key] = deepClone(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
};
