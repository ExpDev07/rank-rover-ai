import { jsxs, jsx } from "react/jsx-runtime";
import { c as cn } from "./button-hFl330a_.js";
import { N as Navbar, F as Footer } from "./footer-Cb3smiQQ.js";
function Layout({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: cn("flex-1", className), ...props, children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Layout as L
};
