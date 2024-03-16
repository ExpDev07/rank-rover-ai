import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { usePage, Link, router, Head } from "@inertiajs/react";
import { c as cn, B as Button } from "./button-hFl330a_.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogFooter, g as Avatar, h as AvatarImage, i as AvatarFallback, j as DialogClose, A as AppLayout, P as PageHeader, S as Section } from "./Section-CEFJvy7d.js";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { B as Badge } from "./badge-DvbvYTRT.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BTxPqJJ5.js";
import { CaretSortIcon, ChevronUpIcon, ChevronDownIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { L as Label, F as Form, a as FormField, b as FormItem, c as FormLabel, d as FormControl, e as FormMessage } from "./form-CDXYzjRV.js";
import { I as Input } from "./input-qUtJj0zD.js";
import { S as Switch } from "./switch-CLL_Qge_.js";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as SelectPrimitive from "@radix-ui/react-select";
import { L as LanguagePicker } from "./LanguagePicker-OqpF5LjA.js";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import "clsx";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "tailwind-merge";
import "@radix-ui/react-avatar";
import "cmdk";
import "@radix-ui/react-dialog";
import "@radix-ui/react-popover";
import "@radix-ui/react-dropdown-menu";
import "@heroicons/react/16/solid";
import "@radix-ui/react-label";
import "@radix-ui/react-switch";
function ContentCard({
  content
}) {
  var _a, _b, _c;
  const page = usePage();
  const { app } = page.props;
  return /* @__PURE__ */ jsx(Link, { href: `/app/${app.slug}/content/${content.slug}`, children: /* @__PURE__ */ jsx(Card, { className: cn(
    "relative w-full px-4 py-2 hover:ring hover:ring-primary"
  ), children: /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between gap-x-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-x-8", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "w-16 h-16",
          src: `https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`,
          alt: content.title
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "mb-2 text-lg", children: content.title }),
        ((_a = content.current_revision) == null ? void 0 : _a.content_md) && /* @__PURE__ */ jsxs(CardDescription, { children: [
          (_b = content.current_revision) == null ? void 0 : _b.content_md.slice(0, 250),
          "..."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2 mt-4", children: content.keywords.map((keyword, i) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: keyword }, i)) })
      ] })
    ] }),
    !content.content_queued && !content.current_revision && /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => console.log("write now"), children: "Write now" }),
    (content.content_queued || ((_c = content.current_revision) == null ? void 0 : _c.status) === "generating") && /* @__PURE__ */ jsx(ArrowPathIcon, { className: "w-7 h-7 animate-spin text-muted-foreground" }),
    !content.content_queued && content.current_revision && content.current_revision.status === "generated" && /* @__PURE__ */ jsx(Badge, { variant: "success", children: "Ready" }),
    !content.content_queued && content.current_revision && content.current_revision.status === "errored" && /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Error" })
  ] }) }) });
}
const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(CaretSortIcon, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDownIcon, {})
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(
  HoverCardPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;
function SelectableCard({
  isSelected,
  onSelect,
  emoji,
  text,
  helpText,
  className,
  children
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      className: cn("relative flex flex-col items-center justify-center w-full h-32 gap-3 border-2 rounded-md", isSelected && "border-primary", className),
      onClick: () => onSelect(),
      "aria-selected": isSelected,
      children: [
        text ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "text-2xl", children: emoji }),
          /* @__PURE__ */ jsx("span", { className: "", children: text })
        ] }) : { children },
        helpText && /* @__PURE__ */ jsx("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ jsxs(HoverCard, { children: [
          /* @__PURE__ */ jsx(HoverCardTrigger, { className: "flex items-center justify-center w-5 h-5 text-sm font-bold text-black border rounded-lg hover:bg-primary hover:text-primary-foreground", children: "?" }),
          /* @__PURE__ */ jsx(HoverCardContent, { children: helpText })
        ] }) })
      ]
    }
  );
}
function CreateContentDialog({
  children
}) {
  const page = usePage();
  const { app } = page.props;
  const [language, setLanguage] = React.useState("english");
  const [size, setSize] = React.useState("medium");
  const [onlyTargetAudience, setOnlyTargetAudience] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState("");
  const [selectedFormat, setSelectedFormat] = React.useState("");
  const [manualWorking, setManualWorking] = React.useState(false);
  const [autopilotWorking, setAutopilotWorking] = React.useState(false);
  const manualForm = useForm({
    defaultValues: {
      title: "",
      keywords: ""
    },
    resolver: zodResolver(z.object({
      title: z.string().min(5),
      keywords: z.string().min(3)
    }))
  });
  const handleCreateContent = (data) => {
    router.post(`/app/${app.slug}/content`, {
      ...data,
      language,
      size,
      format: selectedFormat,
      only_target_audience: onlyTargetAudience,
      keywords: data.keywords.split(", ")
    }, {
      preserveState: false,
      preserveScroll: false,
      onBefore: () => manualForm.clearErrors(),
      onStart: () => setManualWorking(true),
      onFinish: () => setManualWorking(false),
      onError: (errors) => Object.keys(errors).forEach((field) => manualForm.setError(field, { message: errors[field] }))
    });
  };
  const handleCreateContentCluster = () => {
    router.post(`/app/${app.slug}/content-cluster`, {
      language,
      size,
      format: selectedFormat,
      only_target_audience: onlyTargetAudience
    }, {
      preserveState: false,
      preserveScroll: false,
      onStart: () => setAutopilotWorking(true),
      onFinish: () => setAutopilotWorking(false)
    });
  };
  return /* @__PURE__ */ jsxs(Dialog, { children: [
    /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "w-full max-w-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsx(DialogTitle, { children: "Let's create some content 🚀" }),
        /* @__PURE__ */ jsx(DialogDescription, { children: "You can create content manually or on AutoPilot. Both leverages AI, but AutoPilot will recommend content for you." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: cn("py-6 space-y-8", (autopilotWorking || manualWorking) && "pointer-events-none opacity-50"), children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Language" }),
          /* @__PURE__ */ jsx(
            LanguagePicker,
            {
              value: language,
              onChange: setLanguage
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "The content will be created in this language." })
        ] }),
        /* @__PURE__ */ jsxs(ScrollArea, { className: "max-w-full whitespace-nowrap", children: [
          /* @__PURE__ */ jsxs("div", { className: cn("flex gap-4 w-max", !language && "opacity-50 pointer-events-none"), children: [
            /* @__PURE__ */ jsx(
              SelectableCard,
              {
                className: "shrink-0 max-w-48 h-28",
                isSelected: selectedFormat === "blog_post",
                onSelect: () => setSelectedFormat("blog_post"),
                emoji: "📝",
                text: "Blog Post"
              }
            ),
            /* @__PURE__ */ jsx(
              SelectableCard,
              {
                className: "shrink-0 max-w-48 h-28",
                isSelected: selectedFormat === "article",
                onSelect: () => setSelectedFormat("article"),
                emoji: "🗞️",
                text: "Article"
              }
            ),
            /* @__PURE__ */ jsx(
              SelectableCard,
              {
                className: "shrink-0 max-w-48 h-28",
                isSelected: selectedFormat === "essay",
                onSelect: () => setSelectedFormat("essay"),
                emoji: "🖋️",
                text: "Essay"
              }
            ),
            /* @__PURE__ */ jsx(
              SelectableCard,
              {
                className: "shrink-0 max-w-48 h-28",
                isSelected: selectedFormat === "how_to_guide_and_tutorial",
                onSelect: () => setSelectedFormat("how_to_guide_and_tutorial"),
                emoji: "🛠️",
                text: "Guide & tutorial"
              }
            ),
            /* @__PURE__ */ jsx(
              SelectableCard,
              {
                className: "shrink-0 max-w-48 h-28",
                isSelected: selectedFormat === "frequently_asked_questions",
                onSelect: () => setSelectedFormat("frequently_asked_questions"),
                emoji: "❓",
                text: "FAQ"
              }
            ),
            /* @__PURE__ */ jsx(
              SelectableCard,
              {
                className: "shrink-0 max-w-48 h-28",
                isSelected: selectedFormat === "listicle",
                onSelect: () => setSelectedFormat("listicle"),
                emoji: "🔢",
                text: "Listicle"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ScrollBar, { orientation: "horizontal" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: cn("flex gap-4", !selectedFormat && "opacity-50 pointer-events-none"), children: [
          /* @__PURE__ */ jsx(
            SelectableCard,
            {
              isSelected: selectedMethod === "autopilot",
              onSelect: () => setSelectedMethod("autopilot"),
              emoji: "🤖",
              text: "AutoPilot",
              helpText: "AutoPilot (🤖) will generate up to 8 pieces of recommendations for your selected content."
            }
          ),
          /* @__PURE__ */ jsx(
            SelectableCard,
            {
              isSelected: selectedMethod === "manual",
              onSelect: () => setSelectedMethod("manual"),
              emoji: "🧑",
              text: "Manual"
            }
          )
        ] }),
        selectedMethod === "manual" && /* @__PURE__ */ jsx(Form, { ...manualForm, children: /* @__PURE__ */ jsxs("form", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: manualForm.control,
              name: "title",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Title" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "How SEO can drive organic traffic to your app", ...field }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              control: manualForm.control,
              name: "keywords",
              render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
                /* @__PURE__ */ jsx(FormLabel, { children: "Keywords" }),
                /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "text", placeholder: "seo, ai, traffic", ...field }) }),
                /* @__PURE__ */ jsx(FormMessage, {})
              ] })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: cn(!selectedMethod && "opacity-50 pointer-events-none"), children: /* @__PURE__ */ jsxs(Select, { onValueChange: (value) => setSize(value), defaultValue: size, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select a length" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "short", children: "Short" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "medium", children: "Medium" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "long", children: "Long" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "extra_long", children: "Extra long" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: cn("flex items-center space-x-2", !selectedMethod && "opacity-50 pointer-events-none"), children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              id: "target-audience",
              checked: onlyTargetAudience,
              onCheckedChange: setOnlyTargetAudience
            }
          ),
          /* @__PURE__ */ jsx(Label, { htmlFor: "target-audience", children: "Only generate with target audience" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        autopilotWorking && /* @__PURE__ */ jsxs("ul", { className: "flex flex-col items-center justify-center w-full mb-6 gap-y-4", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-x-2", children: [
            /* @__PURE__ */ jsx("span", { className: "block w-4 h-4 rounded-full animate-pulse bg-emerald-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Creating titles" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-x-2", children: [
            /* @__PURE__ */ jsx("span", { className: "block w-4 h-4 rounded-full animate-pulse bg-emerald-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Finding the right keywords" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-x-2", children: [
            /* @__PURE__ */ jsx("span", { className: "block w-4 h-4 rounded-full animate-pulse bg-emerald-400" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Crunching SEO" })
          ] })
        ] }),
        (!language || !selectedFormat || !selectedMethod || !size) && /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full py-4",
            type: "button",
            size: "lg",
            disabled: true,
            children: "Choose method"
          }
        ),
        language && selectedFormat && size && selectedMethod === "autopilot" && /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full py-4",
            type: "submit",
            size: "lg",
            loading: autopilotWorking,
            onClick: () => handleCreateContentCluster(),
            children: "Create content with AutoPilot 🤖"
          }
        ),
        language && selectedFormat && size && selectedMethod === "manual" && /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full py-4",
            type: "submit",
            size: "lg",
            loading: manualWorking,
            onClick: () => handleCreateContent(manualForm.getValues()),
            children: "Create content 🧑"
          }
        )
      ] }) })
    ] })
  ] });
}
function CreateContentCard({
  className
}) {
  return /* @__PURE__ */ jsx(CreateContentDialog, { children: /* @__PURE__ */ jsx(Card, { className: cn("relative p-4 hover:ring hover:ring-primary hover:cursor-pointer", className), children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col items-center justify-center h-full gap-2 p-0", children: [
    /* @__PURE__ */ jsx(
      PlusIcon,
      {
        className: "w-16 h-16 text-gray-950"
      }
    ),
    /* @__PURE__ */ jsx("h4", { className: "text-lg text-muted-foreground", children: "Create content" })
  ] }) }) });
}
function ContentGrid({
  content
}) {
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6", children: [
    content.map((c, i) => /* @__PURE__ */ jsx(
      ContentCard,
      {
        content: c
      },
      c.id
    )),
    content.length === 0 && /* @__PURE__ */ jsx(
      CreateContentCard,
      {
        className: cn(content.length === 0 ? "col-span-1 h-52" : "col-span-1 h-full")
      }
    )
  ] });
}
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
function ContentClusterDialog({
  contentCluster,
  children,
  ...props
}) {
  const page = usePage();
  const { app } = page.props;
  const handleWriteContent = (content) => {
    router.post(`/app/${app.slug}/content/${content.slug}/write`, {});
  };
  return /* @__PURE__ */ jsx(Dialog, { ...props, children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-full max-w-7xl", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Create content 🚀" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "We recommended some content for you!" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "py-6", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, {}),
        /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Keywords" }),
        /* @__PURE__ */ jsx(TableHead, {})
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: contentCluster.contents.map((content) => {
        var _a;
        return /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "py-3 pr-4", children: /* @__PURE__ */ jsxs(Avatar, { className: "w-8 h-8", children: [
            /* @__PURE__ */ jsx(
              AvatarImage,
              {
                src: `https://api.dicebear.com/7.x/thumbs/svg?seed=${content.title}`,
                alt: content.title
              }
            ),
            /* @__PURE__ */ jsx(AvatarFallback, { children: content.title })
          ] }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "py-3 pr-4 font-medium", children: !content.current_revision ? content.title : /* @__PURE__ */ jsx(Link, { className: "text-primary", href: `/app/${app.slug}/content/${content.slug}`, children: content.title }) }),
          /* @__PURE__ */ jsx(TableCell, { className: "flex flex-wrap gap-2 py-4 pr-4", children: content.keywords.map((keyword, i) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: keyword }, i)) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-3", children: [
            !content.content_queued && !content.current_revision && /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => handleWriteContent(content), children: "Write now" }),
            (content.content_queued || ((_a = content.current_revision) == null ? void 0 : _a.status) === "generating") && /* @__PURE__ */ jsx(ArrowPathIcon, { className: "w-5 h-5 animate-spin text-muted-foreground" }),
            !content.content_queued && content.current_revision && content.current_revision.status === "generated" && /* @__PURE__ */ jsx(Badge, { variant: "success", children: "Ready" }),
            !content.content_queued && content.current_revision && content.current_revision.status === "errored" && /* @__PURE__ */ jsx(Badge, { variant: "destructive", children: "Error" })
          ] }) })
        ] }, content.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(DialogClose, { asChild: true }) })
  ] }) });
}
function ContentIndexPage({
  app,
  content,
  content_cluster
}) {
  content.map((c) => c.current_revision).filter((cRevision) => cRevision).forEach((cRevision) => {
    Echo.private(`contentRevisions.${cRevision.id}`).listen("ContentRevisionStatusChangedEvent", (e) => {
      router.reload({ only: ["content", "content_cluster"], preserveState: true });
    });
  });
  return /* @__PURE__ */ jsxs(AppLayout, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx("title", { children: "Your content" }) }),
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "Your content",
        description: "All your content here.",
        actions: /* @__PURE__ */ jsx(CreateContentDialog, { children: /* @__PURE__ */ jsx(Button, { children: "Create content 🚀" }) })
      }
    ),
    /* @__PURE__ */ jsxs("main", { children: [
      content_cluster && /* @__PURE__ */ jsx(
        ContentClusterDialog,
        {
          contentCluster: content_cluster,
          defaultOpen: true,
          onOpenChange: () => router.get(`/app/${app.slug}/content`)
        }
      ),
      /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(
        ContentGrid,
        {
          content
        }
      ) })
    ] })
  ] });
}
export {
  ContentIndexPage as default
};
