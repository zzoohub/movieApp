export const useUser = () => {
  const user = JSON.parse(localStorage.getItem("loginUser"))
  return { user };
}