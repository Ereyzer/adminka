export function isAdmin() {
  let testIsAdmin = false;
  //request on backend add later.
  testIsAdmin = localStorage.getItem('isAdmin') ? true : false;
  return testIsAdmin;
}
