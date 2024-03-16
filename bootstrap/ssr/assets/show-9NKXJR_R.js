import { jsxs, jsx } from "react/jsx-runtime";
import { router, usePage, Head } from "@inertiajs/react";
import { A as AppLayout, P as PageHeader, S as Section } from "./Section-CEFJvy7d.js";
import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { B as Button, c as cn } from "./button-hFl330a_.js";
import { PencilIcon } from "@heroicons/react/16/solid";
import { I as Input } from "./input-qUtJj0zD.js";
import { T as Textarea } from "./textarea-DJWfG70m.js";
import { F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage, f as FormDescription } from "./form-CDXYzjRV.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-BTxPqJJ5.js";
import { PaperPlaneIcon, SketchLogoIcon, HeartIcon } from "@radix-ui/react-icons";
import "@radix-ui/react-avatar";
import "cmdk";
import "@radix-ui/react-dialog";
import "@radix-ui/react-popover";
import "@radix-ui/react-dropdown-menu";
import "./badge-DvbvYTRT.js";
import "class-variance-authority";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function MyAppCard({
  app
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const form = useForm({
    defaultValues: {
      name: app.name || "",
      description: app.description || "",
      target_audience: app.target_audience || ""
    },
    resolver: zodResolver(z.object({
      name: z.string().min(3),
      description: z.string().min(50),
      target_audience: z.string().min(50)
    }))
  });
  const handleSubmit = (data) => {
    router.put(`/app/${app.slug}`, data, {
      onBefore: () => form.clearErrors(),
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
      onError: (errors) => Object.keys(errors).forEach((field) => form.setError(field, { message: errors[field] }))
    });
  };
  return /* @__PURE__ */ jsxs(Card, { className: "relative w-full p-6", children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      !isEditing && /* @__PURE__ */ jsx(Button, { className: "absolute top-5 right-5", variant: "outline", onClick: () => setIsEditing(true), children: /* @__PURE__ */ jsx(PencilIcon, { className: "w-6 h-6 text-muted-foreground" }) }),
      /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: "Your app 😁" }),
      /* @__PURE__ */ jsx(CardDescription, { className: "text-md", children: "We'll use this information as context whenever creating your content." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { className: cn("space-y-4", !isEditing && "opacity-50 pointer-events-none"), children: [
      /* @__PURE__ */ jsx(
        FormField,
        {
          control: form.control,
          name: "name",
          render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Name" }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "My app", ...field }) }),
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
            /* @__PURE__ */ jsx(FormLabel, { children: "Description (min. 50 characters)" }),
            /* @__PURE__ */ jsx(FormDescription, { children: "Provide a description of your app." }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { placeholder: "An app that leverages advanced AI to recommend sports betting placements.", rows: 4, ...field }) }),
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
            /* @__PURE__ */ jsx(FormLabel, { children: "Target audience (min. 50 characters)" }),
            /* @__PURE__ */ jsx(FormDescription, { children: "Explain the target audience for your app." }),
            /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { placeholder: "Professional and hobby sport bettors above the age of 18 who wish to gain an adventage in their day-to-day sports betting activity by leveraging AI.", rows: 4, ...field }) }),
            /* @__PURE__ */ jsx(FormMessage, {})
          ] })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(CardFooter, { children: !isEditing ? /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-full",
        size: "lg",
        variant: "outline",
        onClick: () => setIsEditing(true),
        children: "Edit app ✏️"
      }
    ) : !form.formState.isDirty ? /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-full",
        size: "lg",
        variant: "outline",
        onClick: () => setIsEditing(false),
        children: "Cancel ❌"
      }
    ) : /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-full",
        size: "lg",
        loading,
        onClick: () => handleSubmit(form.getValues()),
        children: "Update app 🚀"
      }
    ) })
  ] });
}
function StatisticCard({
  title,
  icon,
  amount,
  amountDescription
}) {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2 space-y-0", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium", children: title }),
      icon
    ] }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: amount }) })
  ] });
}
function StatisticsGrid() {
  const page = usePage();
  const { statistics: stats } = page.props;
  const statistics = [
    {
      title: "Content generated",
      icon: /* @__PURE__ */ jsx(PaperPlaneIcon, { width: 24, height: 24 }),
      amount: stats.content_generated.amount,
      amountDescription: "+32% increase from last month"
    },
    {
      title: "Dollars saved",
      icon: /* @__PURE__ */ jsx(SketchLogoIcon, { width: 24, height: 24 }),
      amount: `$ ${stats.dollars_saved.amount}`,
      amountDescription: "+15% increase from last month"
    },
    {
      title: "Hours saved",
      icon: /* @__PURE__ */ jsx(HeartIcon, { width: 24, height: 24 }),
      amount: stats.hours_saved.amount,
      amountDescription: "+62% increase from last month"
    }
  ];
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3", children: statistics.map((statistic) => /* @__PURE__ */ jsx(
    StatisticCard,
    {
      title: statistic.title,
      icon: statistic.icon,
      amount: statistic.amount,
      amountDescription: statistic.amountDescription
    },
    statistic.title
  )) });
}
function AppsShowPage({
  app,
  content
}) {
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: app.name }) }),
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Hi, Marius!",
        description: `Keep up with the latest for ${app.name} here.`
      }
    ),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(StatisticsGrid, {}) }),
      /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(
        MyAppCard,
        {
          app
        }
      ) })
    ] })
  ] });
}
export {
  AppsShowPage as default
};
