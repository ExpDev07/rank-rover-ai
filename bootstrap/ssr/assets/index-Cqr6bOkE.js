import { jsx, jsxs } from "react/jsx-runtime";
import { Link, router, Head } from "@inertiajs/react";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter, A as AppLayout, P as PageHeader, S as Section } from "./Section-CEFJvy7d.js";
import { c as cn, B as Button } from "./button-hFl330a_.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BTxPqJJ5.js";
import { PlusIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage, L as Label } from "./form-CDXYzjRV.js";
import { I as Input } from "./input-qUtJj0zD.js";
import { T as Textarea } from "./textarea-DJWfG70m.js";
import { L as LanguagePicker } from "./LanguagePicker-OqpF5LjA.js";
import "@radix-ui/react-avatar";
import "cmdk";
import "@radix-ui/react-dialog";
import "@radix-ui/react-popover";
import "@radix-ui/react-dropdown-menu";
import "./badge-DvbvYTRT.js";
import "class-variance-authority";
import "@heroicons/react/16/solid";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function AppCard({
  app,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(Link, { href: `/app/${app.slug}`, children: /* @__PURE__ */ jsx(Card, { className: cn("p-4 relative hover:ring hover:ring-primary hover:cursor-pointer", className), ...props, children: /* @__PURE__ */ jsxs(CardHeader, { children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "w-16 h-16 mb-6",
        src: `https://api.dicebear.com/7.x/shapes/svg?seed=${app.name}`,
        alt: app.name
      }
    ),
    /* @__PURE__ */ jsx(CardTitle, { children: app.name }),
    /* @__PURE__ */ jsx(CardDescription, { children: app.description })
  ] }) }) });
}
function CreateAppDialog({
  children
}) {
  const [loading, setLoading] = React.useState(false);
  const [refresh, setRefresh] = React.useState(0);
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      target_audience: "",
      main_language: "english"
    },
    resolver: zodResolver(z.object({
      name: z.string(),
      description: z.string().min(5),
      target_audience: z.string().min(3),
      main_language: z.string()
    }))
  });
  const handleSelectLanguage = (language) => {
    form.setValue("main_language", language);
    setRefresh(refresh + 1);
  };
  const handleSubmit = (data) => {
    router.post("/apps", data, {
      onBefore: () => form.clearErrors(),
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      onError: (errors) => Object.keys(errors).forEach((field) => form.setError(field, { message: errors[field] }))
    });
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "w-full max-w-xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-xl", children: "Create an app 📱" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "Your app will be used as context whenever creating your content." })
      ] }),
      /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: "py-6 space-y-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "name",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Name" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "Todoly.ai", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "description",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Description" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { rows: "6", placeholder: "An app that uses AI to organize your todos.", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            control: form.control,
            name: "target_audience",
            render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
              /* @__PURE__ */ jsx(FormLabel, { children: "Your target audience" }),
              /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { rows: "6", placeholder: "All people (above age 20) that wish to leverage AI to stay more organized.", ...field }) }),
              /* @__PURE__ */ jsx(FormMessage, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Main Language" }),
          /* @__PURE__ */ jsx(
            LanguagePicker,
            {
              value: form.getValues("main_language"),
              onChange: handleSelectLanguage
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "We'll select this language as default whenever creating your content." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(
        Button,
        {
          className: "w-full py-4",
          type: "submit",
          size: "lg",
          loading,
          onClick: () => handleSubmit(form.getValues()),
          children: "Create app 📱"
        }
      ) })
    ] })
  ] });
}
function CreateAppCard({
  className
}) {
  return /* @__PURE__ */ jsx(CreateAppDialog, { children: /* @__PURE__ */ jsx(Card, { className: cn("relative p-4 hover:ring hover:ring-primary hover:cursor-pointer", className), children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center justify-center h-full gap-2 p-0", children: [
    /* @__PURE__ */ jsx(
      PlusIcon,
      {
        className: "w-16 h-16 text-gray-950"
      }
    ),
    /* @__PURE__ */ jsx("h4", { className: "text-lg text-muted-foreground", children: "Create app" })
  ] }) }) });
}
function AppsGrid({
  apps
}) {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: [
    apps.map((app, i) => /* @__PURE__ */ jsx(
      AppCard,
      {
        className: "h-full",
        app
      },
      i
    )),
    /* @__PURE__ */ jsx(
      CreateAppCard,
      {
        className: cn(apps.length === 0 ? "col-span-4 h-52" : "col-span-1 h-full")
      }
    )
  ] });
}
function AppsShowPage({
  apps
}) {
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Your apps" }) }),
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Your apps 📱",
        description: "We use your app as context whenever generating content for it."
      }
    ),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(
      AppsGrid,
      {
        apps
      }
    ) }) })
  ] });
}
export {
  AppsShowPage as default
};
