import { changeSkip } from "../router";

const useDelayNav = (nav: any, path: string) => {
  changeSkip(true);
  return setTimeout(() => {
    nav(path);
  }, 1000);
};

export default useDelayNav;
