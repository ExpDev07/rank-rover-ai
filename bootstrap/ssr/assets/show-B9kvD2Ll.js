import { jsxs, jsx } from "react/jsx-runtime";
import { Link, Head } from "@inertiajs/react";
import { marked } from "marked";
import { B as Button } from "./button-hFl330a_.js";
import { N as Navbar, F as Footer } from "./footer-0Q4KCSOe.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function ArticleLayout({
  current_user,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "container flex-1 mx-auto", children: /* @__PURE__ */ jsxs("article", { className: "py-12 mx-auto prose lg:py-24 prose-md lg:prose-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-12 lg:mb-20", children }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-3 lg:flex-row", children: [
        /* @__PURE__ */ jsx(Button, { size: "lg", asChild: true, children: current_user ? /* @__PURE__ */ jsx(Link, { href: "/apps", children: "Go to app" }) : /* @__PURE__ */ jsx(Link, { href: "/pricing", children: "Get started" }) }),
        /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Back to RankRover.ai" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function PricingPage({
  title,
  keywords,
  description,
  content_md
}) {
  return /* @__PURE__ */ jsxs(ArticleLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: keywords.join(", ") }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" })
    ] }),
    /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: marked.parse(content_md) } })
  ] });
}
export {
  PricingPage as default
};
