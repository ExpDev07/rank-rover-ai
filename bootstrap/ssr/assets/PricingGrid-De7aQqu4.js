import { jsxs, jsx } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { CheckCircle2 } from "lucide-react";
import { c as cn, B as Button } from "./button-hFl330a_.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-BTxPqJJ5.js";
function PricingCard({
  className,
  price,
  checkout
}) {
  const page = usePage();
  const { current_user, current_user_subscribed } = page.props;
  return /* @__PURE__ */ jsxs(Card, { className: cn(
    "relative flex flex-col justify-between",
    price.popular ? "border-rose-400 py-4 border-4 scale-110" : "py-4 border-2",
    className
  ), children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      price.popular && /* @__PURE__ */ jsx("span", { className: "absolute text-4xl top-5 right-5", children: "🔥" }),
      price.isYearly && price.yearlyPrice && price.price ? /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-lg text-zinc-700", children: price.name.split(" ")[0] }),
        /* @__PURE__ */ jsxs("div", { className: cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black", price.popular && "bg-gradient-to-r from-orange-400 to-rose-400"), children: [
          "Save $",
          price.price / 100 * 12 - price.yearlyPrice
        ] })
      ] }) : /* @__PURE__ */ jsx(CardTitle, { className: "text-lg text-zinc-700", children: price.name }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-3xl font-bold", children: price.yearlyPrice && price.isYearly ? "$" + price.yearlyPrice : price.price / 100 ? "$" + price.price / 100 : "Custom" }),
        /* @__PURE__ */ jsx("span", { className: "flex flex-col justify-end mb-1 text-sm", children: price.yearlyPrice && price.isYearly ? "/year" : price.price / 100 ? "/month" : "" })
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { className: "pt-2", children: price.description })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "flex flex-col gap-2", children: price.features.map((feature) => /* @__PURE__ */ jsx(
      CheckItem,
      {
        text: feature
      },
      feature
    )) }),
    /* @__PURE__ */ jsx(CardFooter, { className: "pt-6 mt-auto", children: /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-full",
        size: "lg",
        variant: price.popular ? "default" : "outline",
        asChild: true,
        children: current_user && current_user_subscribed ? /* @__PURE__ */ jsxs(Link, { href: "/apps", method: "get", children: [
          "Go to app ",
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-lg -translate-y-1", children: "👉" })
        ] }) : checkout ? /* @__PURE__ */ jsxs(Link, { href: `/select-plan/${price.key}/checkout`, method: "post", children: [
          "Select plan ",
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-lg -translate-y-1", children: "👉" })
        ] }) : /* @__PURE__ */ jsxs(Link, { href: `/register?plan=${price.key}`, method: "get", children: [
          "Get started ",
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-lg -translate-y-1", children: "👉" })
        ] })
      }
    ) })
  ] });
}
function CheckItem({
  text
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsx(
      CheckCircle2,
      {
        className: "my-auto text-green-400",
        size: 18
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "pt-0.5 text-zinc-700 text-sm", children: text })
  ] });
}
function PricingGrid({
  prices,
  checkout = false
}) {
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-12 md:grid-cols-3 place-items-center", children: prices.map((price) => /* @__PURE__ */ jsx(
    PricingCard,
    {
      className: "w-full h-full",
      price,
      checkout
    },
    price.id
  )) });
}
export {
  PricingGrid as P
};
