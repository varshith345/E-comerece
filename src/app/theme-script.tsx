import { STORAGE_KEYS } from "@/constants/storage";

const buildScript = (key: string): string => `
(function(){try{
  var k=${JSON.stringify(key)};
  var stored=localStorage.getItem(k);
  var mode=(stored==="light"||stored==="dark"||stored==="system")?stored:"system";
  var resolved=mode==="system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")
    : mode;
  document.documentElement.setAttribute("data-theme",resolved);
}catch(e){}})();
`;

export const ThemeScript = (): JSX.Element => (
  <script
    suppressHydrationWarning
    dangerouslySetInnerHTML={{ __html: buildScript(STORAGE_KEYS.theme) }}
  />
);
