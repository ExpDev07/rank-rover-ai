import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { L as Layout } from "./web-Bnj_esma.js";
import { P as PricingGrid } from "./PricingGrid-De7aQqu4.js";
import "./button-hFl330a_.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./footer-0Q4KCSOe.js";
import "lucide-react";
import "./card-BTxPqJJ5.js";
function PricingPage({
  subscription_plans
}) {
  return /* @__PURE__ */ jsxs(Layout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Our plans" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Choose from one of our available plans below to get started with RankRover.ai." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "seo, ai, traffic, SaaS, chatgpt, tools, content, content generation, plans, pricing" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" })
    ] }),
    /* @__PURE__ */ jsx("header", { className: "pt-20 pb-0 text-center", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-4xl font-bold", children: "Our plans 🚀" }),
      /* @__PURE__ */ jsx("p", { className: "mb-12 text-lg lg:mb-20 text-muted-foreground", children: "Choose from one of our available plans below to get started." })
    ] }) }),
    /* @__PURE__ */ jsx("main", { className: "pt-0 pb-48", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx(
      PricingGrid,
      {
        prices: subscription_plans,
        checkout: false
      }
    ) }) })
  ] });
}
export {
  PricingPage as default
};
