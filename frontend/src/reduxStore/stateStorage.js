export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem("state", serializedState);
  } catch (e) {
    //
  }
};

export const getPreloadedState = () => {
  try {
    const serializedState = localStorage.getItem("state");

    if (serializedState === null) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    //

    return undefined;
  }
};

export const redirectToLogin = () => {
  localStorage.clear();
  window.location.href = "/login";
};
