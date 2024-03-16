import { jsxs, jsx } from "react/jsx-runtime";
import { router, Head, Link } from "@inertiajs/react";
import { B as Button } from "./button-hFl330a_.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function ThankYouPage({
  current_user,
  current_user_subscribed
}) {
  if (current_user_subscribed) {
    router.get("/apps");
  } else {
    setTimeout(() => {
      router.get("/thank-you", {}, { only: ["current_user_subscribed"] });
    }, 5e3);
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen p-5", children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Select plan" }) }),
    /* @__PURE__ */ jsx(Button, { className: "absolute top-5 left-5", variant: "outline", asChild: true, children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Back to home 🛑" }) }),
    /* @__PURE__ */ jsxs("header", { className: "flex flex-col items-center justify-center text-center", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "mb-0 w-44 animate-bounce",
          src: "https://rankrover.ai/images/logo.png",
          alt: "Logo"
        }
      ),
      /* @__PURE__ */ jsxs("h1", { className: "mb-6 text-6xl font-bold", children: [
        "Thank you! ",
        /* @__PURE__ */ jsx("br", {}),
        " We're checking your payment 🥳"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mb-20 text-xl text-muted-foreground", children: [
        "We appreciate your trust, ",
        current_user.name,
        "! Please hold while we're confirming your payment."
      ] })
    ] })
  ] });
}
export {
  ThankYouPage as default
};
