// Runs before hydration so the first paint matches the stored theme.
export const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("portfolio-theme");
    var theme = stored === "light" ? "light" : "dark";
    var root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch (error) {}
})();
`;
