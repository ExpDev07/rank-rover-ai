import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { Head, Link, router } from "@inertiajs/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { I as Input } from "./input-qUtJj0zD.js";
import { B as Button } from "./button-hFl330a_.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-BTxPqJJ5.js";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-CDXYzjRV.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function RegisterPage({
  subscription_plan
}) {
  const [loading, setLoading] = React.useState(false);
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] = React.useState(subscription_plan || null);
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    },
    resolver: zodResolver({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      password_confirmation: z.string()
    })
  });
  const handleSubmit = (data) => {
    router.post("/register", { ...data, subscription_plan: (selectedSubscriptionPlan == null ? void 0 : selectedSubscriptionPlan.key) || null }, {
      onBefore: () => form.clearErrors(),
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      onError: (errors) => Object.keys(errors).forEach((field) => form.setError(field, { message: errors[field] }))
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center h-screen gap-12 p-3", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Create account" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Create an account to get started with RankRover.ai." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "seo, ai, traffic, SaaS, chatgpt, tools, content, content generation, registration" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "index, follow" })
    ] }),
    /* @__PURE__ */ jsx(Button, { className: "absolute z-50 top-5 left-5", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Back to home 🛑" }) }),
    /* @__PURE__ */ jsxs(
      "svg",
      {
        className: "fixed inset-0 brightness-75",
        viewBox: "0 0 1920 1080",
        width: "1920",
        height: "1080",
        xmlns: "http://www.w3.org/2000/svg",
        xmlnsXlink: "http://www.w3.org/1999/xlink",
        version: "1.1",
        children: [
          /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: "1920", height: "1080", fill: "#001220" }),
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "grad1_0", x1: "43.8%", y1: "0%", x2: "100%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "14.444444444444446%", stopColor: "#001220", stopOpacity: "1" }),
            /* @__PURE__ */ jsx("stop", { offset: "85.55555555555554%", stopColor: "#001220", stopOpacity: "1" })
          ] }) }),
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "grad2_0", x1: "0%", y1: "0%", x2: "56.3%", y2: "100%", children: [
            /* @__PURE__ */ jsx("stop", { offset: "14.444444444444446%", stopColor: "#001220", stopOpacity: "1" }),
            /* @__PURE__ */ jsx("stop", { offset: "85.55555555555554%", stopColor: "#001220", stopOpacity: "1" })
          ] }) }),
          /* @__PURE__ */ jsx("g", { transform: "translate(1920, 0)", children: /* @__PURE__ */ jsx("path", { d: "M0 972C-132.9 965.5 -265.8 959 -372 898C-478.1 837.1 -557.5 721.7 -618 618C-678.5 514.4 -720.2 422.5 -776.1 321.5C-831.9 220.4 -902 110.2 -972 0L0 0Z", fill: "#2563eb" }) }),
          /* @__PURE__ */ jsx("g", { transform: "translate(0, 1080)", children: /* @__PURE__ */ jsx("path", { d: "M0 -972C113.3 -900.4 226.6 -828.8 315.3 -761.3C404.1 -693.7 468.3 -630.3 573.5 -573.5C678.6 -516.6 824.8 -466.4 898 -372C971.3 -277.5 971.6 -138.7 972 0L0 0Z", fill: "#2563eb" }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Card, { className: "relative w-full max-w-xl p-6 shadow-lg", children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "w-32 pb-0 pr-4 mb-4 border-b",
            src: "https://rankrover.ai/images/logo.png",
            alt: "RankRover.ai"
          }
        ),
        /* @__PURE__ */ jsx(CardTitle, { className: "text-2xl text-primary", children: "Create an account! 😊" }),
        /* @__PURE__ */ jsx(CardDescription, { className: "text-md", children: "You can register to RankRover.ai below." })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: "pb-6 space-y-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Your name" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "John Doe", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "email",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Email address" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "email", placeholder: "john@example.org", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "password",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Password" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "password", placeholder: "************", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "password_confirmation",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Repeat password" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "password", placeholder: "************", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        selectedSubscriptionPlan && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-6 px-4 py-3 mt-2 rounded-md shadow ring-2 ring-rose-400 bg-card text-card-foreground", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold", children: selectedSubscriptionPlan.name }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: selectedSubscriptionPlan.description })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
              "$",
              selectedSubscriptionPlan.price / 100,
              "/m"
            ] })
          ] }),
          /* @__PURE__ */ jsx(Button, { className: "mt-1", variant: "link", size: "sm", onClick: () => setSelectedSubscriptionPlan(null), children: "Select a different plan later" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs(CardFooter, { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "w-full py-6 mb-6 text-md",
            type: "submit",
            size: "lg",
            loading,
            onClick: () => handleSubmit(form.getValues()),
            children: [
              "Create account",
              selectedSubscriptionPlan && " and checkout",
              " ",
              /* @__PURE__ */ jsx("span", { className: "ml-2 text-lg -translate-y-1", children: "👉" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Already have an account? ",
          /* @__PURE__ */ jsx(Link, { className: "text-primary hover:underline", href: "/login", children: "Log in now" }),
          "."
        ] })
      ] })
    ] })
  ] });
}
export {
  RegisterPage as default
};
