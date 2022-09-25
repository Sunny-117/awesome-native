function trimSpace(str) {
  return str.replace(/\s+/g, "");
}
function digitalize(str) {
  return Number(str) || 0;
}
export { trimSpace, digitalize };
