import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-hFl330a_.js";
import { P as PricingGrid } from "./PricingGrid-De7aQqu4.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "lucide-react";
import "./card-BTxPqJJ5.js";
function SelectPlanPage({
  current_user,
  subscription_plans
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen p-5", children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Select plan" }) }),
    /* @__PURE__ */ jsx(Button, { className: "absolute top-5 left-5", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Back to home 🛑" }) }),
    /* @__PURE__ */ jsxs("header", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-4xl font-bold", children: "Select your plan 🚀" }),
      /* @__PURE__ */ jsxs("p", { className: "mb-20 text-lg text-muted-foreground", children: [
        "Hi, ",
        current_user.name,
        "! Choose from one of our available plans below."
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(
      PricingGrid,
      {
        prices: subscription_plans,
        checkout: true
      }
    ) })
  ] });
}
export {
  SelectPlanPage as default
};
