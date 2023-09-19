// TO DO: реализовать функции, необходимые для авторизации, помимо работы с API
// Например, сохранения данных пользователя в LS, восстановления и удаления
export function setUserToLocalStorage(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
  const result = localStorage.getItem('user');
  return result ? JSON.parse(result) : null;
}

export function deleteUserFromLocalStorage() {
  delete localStorage.user;
}