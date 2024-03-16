import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { B as Button } from "./button-hFl330a_.js";
function Navbar() {
  const page = usePage();
  const { current_user } = page.props;
  return /* @__PURE__ */ jsx("nav", { className: "py-2 text-black bg-white border-b", children: /* @__PURE__ */ jsxs("div", { className: "container flex items-center justify-between mx-auto gap-x-6", children: [
    /* @__PURE__ */ jsxs(Link, { className: "flex items-center gap-x-0", href: "/", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "block w-5 lg:w-20",
          src: "https://rankrover.ai/images/logo.png",
          alt: "logo"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "font-mono font-bold text-md lg:text-lg", children: "RankRover.ai" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "items-center hidden mr-6 lg:flex gap-x-4", children: [
        /* @__PURE__ */ jsx(Link, { className: "text-sm hover:underline hover:text-primary", href: "/", children: "Home" }),
        /* @__PURE__ */ jsx(Link, { className: "text-sm hover:underline hover:text-primary", href: "/pricing", children: "Pricing" })
      ] }),
      current_user ? /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/apps", children: "Go to app 🌟" }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { className: "hidden lg:flex", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/login", children: "Log in 😎" }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/register", children: "Get started 🌟" }) })
      ] })
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "py-8 text-sm text-center bg-black text-gray-50", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: "Tjenesten er utviklet av MeldSmitte, alle rettigheter forebehold." }) });
}
export {
  Footer as F,
  Navbar as N
};
