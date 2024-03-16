import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { router, Head } from "@inertiajs/react";
import { marked } from "marked";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import "clsx";
import { B as Badge } from "./badge-DvbvYTRT.js";
import { B as Button } from "./button-hFl330a_.js";
import { T as Textarea } from "./textarea-DJWfG70m.js";
import { A as AppLayout, P as PageHeader, S as Section } from "./Section-CEFJvy7d.js";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription, e as CardFooter } from "./card-BTxPqJJ5.js";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "tailwind-merge";
import "@radix-ui/react-icons";
import "@radix-ui/react-avatar";
import "cmdk";
import "@radix-ui/react-dialog";
import "@radix-ui/react-popover";
import "@radix-ui/react-dropdown-menu";
import "./input-qUtJj0zD.js";
import "@heroicons/react/16/solid";
function ContentShowPage({
  app,
  content
}) {
  var _a, _b, _c, _d, _e, _f;
  if (!content.current_revision || content.current_revision.status === "idle" || content.current_revision.status === "generating") {
    setTimeout(() => {
      router.reload({ only: ["content"], preserveState: true });
    }, 1e4);
  }
  const [loadingRetry, setLoadingRetry] = React.useState(false);
  const [loadingTweak, setLoadingTweak] = React.useState(false);
  const [tweak, setTweak] = React.useState("");
  const handleRetry = () => {
    router.post(`/app/${app.slug}/content/${content.slug}/retry`, {}, {
      only: ["content"],
      onStart: () => setLoadingRetry(true),
      onFinish: () => setLoadingRetry(false)
    });
  };
  const handleTweak = () => {
    router.post(`/app/${app.slug}/content/${content.slug}/tweak`, { tweak }, {
      only: ["content"],
      onStart: () => setLoadingTweak(true),
      onFinish: () => setLoadingTweak(false)
    });
    setTweak("");
  };
  const handleCopyToMarkdown = () => {
    var _a2;
    navigator.clipboard.writeText((_a2 = content.current_revision) == null ? void 0 : _a2.content_md);
  };
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: content.title }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative grid grid-cols-12 gap-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-7", children: [
        /* @__PURE__ */ jsx(
          PageHeader,
          {
            title: content.title,
            description: "Manage this content",
            icon: /* @__PURE__ */ jsx(
              "img",
              {
                className: "w-14 h-14",
                src: `https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`,
                alt: content.title
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(Section, { className: "mt-10", children: [
          !content.current_revision && /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center w-full border-2 rounded-md h-52", children: /* @__PURE__ */ jsx(ArrowPathIcon, { className: "w-12 h-12 animate-spin text-muted-foreground" }) }),
          ((_a = content.current_revision) == null ? void 0 : _a.status) === "generating" && /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center w-full border-2 rounded-md h-52", children: /* @__PURE__ */ jsx(ArrowPathIcon, { className: "w-12 h-12 animate-spin text-muted-foreground" }) }),
          ((_b = content.current_revision) == null ? void 0 : _b.status) === "errored" && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center w-full border-2 rounded-md h-52", children: [
            /* @__PURE__ */ jsx("h4", { className: "mb-2 text-2xl text-destructive", children: "Could not create content" }),
            /* @__PURE__ */ jsx("p", { className: "mb-6 text-muted-foreground text-md", children: "Something wrong happened while creating your content." }),
            /* @__PURE__ */ jsx(
              Button,
              {
                disabled: loadingRetry,
                loading: loadingRetry,
                onClick: () => handleRetry(),
                children: "Retry now"
              }
            )
          ] }),
          ((_c = content.current_revision) == null ? void 0 : _c.status) === "generated" && ((_d = content.current_revision) == null ? void 0 : _d.content_md) && /* @__PURE__ */ jsx(
            "article",
            {
              className: "prose prose-md",
              dangerouslySetInnerHTML: { __html: marked.parse(content.current_revision.content_md) }
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-5 space-y-4 ", children: [
        /* @__PURE__ */ jsxs(Card, { className: "p-3", children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { children: "SEO 🚀" }) }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx(Badge, { className: "mb-3", variant: "secondary", children: content.slug }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: content.keywords.map((keyword, i) => /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "secondary",
                children: keyword
              },
              i
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "p-3", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Tweak your content 🛠️" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Make tweaks to your content by talking to our AI." })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(
            Textarea,
            {
              placeholder: "Write more about the impact backlinking has on SEO",
              rows: "6",
              onChange: (e) => setTweak(e.target.value)
            }
          ) }),
          /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "w-full",
              disabled: tweak.length < 20 || loadingTweak || ((_e = content.current_revision) == null ? void 0 : _e.status) !== "generated",
              loading: loadingTweak,
              onClick: () => handleTweak(),
              children: "Send tweak 🛠️"
            }
          ) })
        ] }),
        ((_f = content.current_revision) == null ? void 0 : _f.status) === "generated" && /* @__PURE__ */ jsxs(Card, { className: "p-3", children: [
          /* @__PURE__ */ jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsx(CardTitle, { children: "Save to somewhere 📠" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Take your content with you to where you like." })
          ] }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(
            Button,
            {
              className: "w-full",
              onClick: () => handleCopyToMarkdown(),
              children: "Copy as markdown (MD) 🧲"
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
export {
  ContentShowPage as default
};
