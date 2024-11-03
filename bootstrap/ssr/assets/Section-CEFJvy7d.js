import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { c as cn, B as Button } from "./button-hFl330a_.js";
import { Link, usePage, router } from "@inertiajs/react";
import * as React from "react";
import { Cross2Icon, MagnifyingGlassIcon, CheckIcon, HamburgerMenuIcon, ChevronRightIcon, DotFilledIcon, BellIcon } from "@radix-ui/react-icons";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Command as Command$1 } from "cmdk";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import "./input-qUtJj0zD.js";
import { B as Badge } from "./badge-DvbvYTRT.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BTxPqJJ5.js";
import { HomeIcon, DocumentCheckIcon } from "@heroicons/react/16/solid";
function HeaderNav({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className: cn("flex items-center space-x-4 lg:space-x-6", className),
      ...props,
      children: /* @__PURE__ */ jsx(
        Link,
        {
          href: "/apps",
          className: "text-sm font-medium transition-colors hover:text-primary",
          inactiveProps: { className: "text-muted-foreground" },
          activeOptions: { exact: true },
          children: "Apps"
        }
      )
    }
  );
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/95  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-10 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Cross2Icon, { className: "w-4 h-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-xl font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-md text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Command = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = Command$1.displayName;
const CommandInput = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx(MagnifyingGlassIcon, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsx(
    Command$1.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = Command$1.Input.displayName;
const CommandList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = Command$1.List.displayName;
const CommandEmpty = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(
  Command$1.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = Command$1.Empty.displayName;
const CommandGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = Command$1.Group.displayName;
const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = Command$1.Separator.displayName;
const CommandItem = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  Command$1.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props
  }
));
CommandItem.displayName = Command$1.Item.displayName;
const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
function HeaderAppSwitcher({
  className
}) {
  const page = usePage();
  const { current_user_apps: apps, app: selectedApp } = page.props;
  const [open, setOpen] = React.useState(false);
  const groups = [
    {
      label: "All",
      apps
    }
  ];
  if (!selectedApp) {
    return;
  }
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        className: cn("w-[200px] justify-between", "pointer-events-none", className),
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        "aria-label": "Select an app",
        children: [
          selectedApp ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs(Avatar, { className: "w-5 h-5 mr-2", children: [
              /* @__PURE__ */ jsx(
                AvatarImage,
                {
                  src: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=/${selectedApp.name}`,
                  alt: selectedApp.name
                }
              ),
              /* @__PURE__ */ jsx(AvatarFallback, { children: "SC" })
            ] }),
            selectedApp.name
          ] }) : /* @__PURE__ */ jsx(Fragment, { children: "Select an app" }),
          /* @__PURE__ */ jsx("div", { className: "ml-auto" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-[250px] p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsxs(CommandList, { children: [
        /* @__PURE__ */ jsx(
          CommandInput,
          {
            placeholder: "Search apps..."
          }
        ),
        /* @__PURE__ */ jsx(CommandEmpty, { children: "No apps found." }),
        groups.map((group) => /* @__PURE__ */ jsx(CommandGroup, { heading: group.label, children: group.apps.map((app, i) => /* @__PURE__ */ jsxs(
          CommandItem,
          {
            className: "text-sm",
            onSelect: () => {
              setOpen(false);
              router.get(`/app/${app.slug}`);
            },
            children: [
              /* @__PURE__ */ jsxs(Avatar, { className: "w-5 h-5 mr-2", children: [
                /* @__PURE__ */ jsx(
                  AvatarImage,
                  {
                    src: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=/${app.name}`,
                    alt: app.name
                  }
                ),
                /* @__PURE__ */ jsx(AvatarFallback, { children: "SC" })
              ] }),
              app.name,
              /* @__PURE__ */ jsx(
                CheckIcon,
                {
                  className: cn(
                    "ml-auto h-4 w-4",
                    (selectedApp == null ? void 0 : selectedApp.name) === app.name ? "opacity-100" : "opacity-0"
                  )
                }
              )
            ]
          },
          i
        )) }, group.label))
      ] }),
      /* @__PURE__ */ jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsx(CommandList, { children: /* @__PURE__ */ jsx(CommandGroup, { children: /* @__PURE__ */ jsx(Link, { href: "/apps", children: /* @__PURE__ */ jsxs(CommandItem, { children: [
        /* @__PURE__ */ jsx(HamburgerMenuIcon, { className: "w-5 h-5 mr-2" }),
        "Manage apps"
      ] }) }) }) })
    ] }) })
  ] });
}
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRightIcon, { className: "ml-auto h-4 w-4" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(DotFilledIcon, { className: "h-4 w-4 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function HeaderProfile() {
  const handleLogout = async () => {
    router.post("/logout");
  };
  const handleClickBilling = async () => {
    router.get("/billing");
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "relative w-8 h-8 rounded-full", children: /* @__PURE__ */ jsxs(Avatar, { className: "w-8 h-8", children: [
      /* @__PURE__ */ jsx(
        AvatarImage,
        {
          src: "https://api.dicebear.com/7.x/initials/svg?seed=MR",
          alt: "Marius Richardsen"
        }
      ),
      /* @__PURE__ */ jsx(AvatarFallback, { children: "MR" })
    ] }) }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { className: "w-56", align: "end", forceMount: true, children: [
      /* @__PURE__ */ jsx(DropdownMenuLabel, { className: "font-normal", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-1", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-medium leading-none", children: "Marius Richardsen" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs leading-none text-muted-foreground", children: "marius@propell.ai" })
      ] }) }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsx(DropdownMenuGroup, { children: /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => handleClickBilling(), children: [
        "Billing",
        /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⌘B" })
      ] }) }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs(DropdownMenuItem, { className: "text-destructive", onClick: () => handleLogout(), children: [
        "Log out",
        /* @__PURE__ */ jsx(DropdownMenuShortcut, { children: "⇧⌘Q" })
      ] })
    ] })
  ] });
}
const notifications = [];
function HeaderNotifications() {
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { className: "relative rounded-full", size: "icon", variant: "secondary", children: [
      /* @__PURE__ */ jsx(BellIcon, { className: "w-6 h-6" }),
      notifications.length > 0 && /* @__PURE__ */ jsx(Badge, { className: "absolute top-0 right-0 text-xs transform translate-x-1/2 -translate-y-1/2", children: "3" })
    ] }) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Card, { className: "border-0 shadow-none", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "border-b", children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Notifications" }),
        /* @__PURE__ */ jsxs(CardDescription, { children: [
          "You have ",
          notifications.filter((n) => !n.read).length,
          " unread messages."
        ] })
      ] }),
      notifications.length > 0 && /* @__PURE__ */ jsx(CardContent, { className: "p-6 space-y-4", children: notifications.map((notification) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-x-4", children: [
        /* @__PURE__ */ jsx("span", { className: "block w-2 h-2 translate-y-2 rounded-full bg-primary" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 gap-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs", children: notification.title }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: notification.date })
        ] })
      ] }, notification.id)) })
    ] }) })
  ] });
}
function DashboardHeader() {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center h-24 px-4 border-b gap-x-2", children: [
    /* @__PURE__ */ jsx(HeaderAppSwitcher, {}),
    /* @__PURE__ */ jsx(HeaderNav, { className: "mx-6" }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center ml-auto space-x-4", children: [
      /* @__PURE__ */ jsx(HeaderProfile, {}),
      /* @__PURE__ */ jsx(HeaderNotifications, {})
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "px-2 py-6", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-center text-muted-foreground", children: "RankRover.ai © 2024. All rights reserved." }) });
}
function DashboardSidebar() {
  const page = usePage();
  const { app } = page.props;
  if (!app) {
    return;
  }
  const getSections = () => {
    const sections = [];
    app && sections.unshift({
      title: app.name,
      items: [
        { title: "App", to: `/app/${app.slug}`, icon: /* @__PURE__ */ jsx(HomeIcon, { className: "w-4 h-4" }), exact: true },
        { title: "Content", to: `/app/${app.slug}/content`, icon: /* @__PURE__ */ jsx(DocumentCheckIcon, { className: "w-4 h-4" }) }
      ]
    });
    return sections;
  };
  return /* @__PURE__ */ jsxs("aside", { className: "sticky flex flex-col w-64 border-r bg-gray-950", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center px-4 py-8", children: /* @__PURE__ */ jsx(Link, { href: `/app/${app.slug}`, children: /* @__PURE__ */ jsx(
      "img",
      {
        className: "w-24",
        src: "http://localhost:8000/images/logo.png",
        alt: "logo"
      }
    ) }) }),
    /* @__PURE__ */ jsx("nav", { className: "flex flex-col", children: getSections().map((section, i) => /* @__PURE__ */ jsxs("section", { className: "p-3", children: [
      /* @__PURE__ */ jsx("h4", { className: "px-2 py-0 mb-2 text-xs text-gray-400", children: section.title }),
      /* @__PURE__ */ jsx("ul", { className: "flex flex-col", children: section.items.map((item, x) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
        Link,
        {
          className: "px-2 py-2.5 mb-1 flex items-center gap-x-1 text-sm rounded-md text-gray-200 hover:bg-primary hover:text-primary-foreground",
          href: item.to,
          children: [
            item.icon,
            item.title
          ]
        }
      ) }, x)) })
    ] }, i)) }),
    /* @__PURE__ */ jsx("footer", { className: "px-4 py-6 mt-auto" })
  ] });
}
function AppLayout({
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex max-h-screen overflow-hidden gap-x-6", children: [
    /* @__PURE__ */ jsx(DashboardSidebar, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 min-h-screen overflow-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx(DashboardHeader, {}) }),
      /* @__PURE__ */ jsx("div", { className: "container flex-1 p-8 pt-10 mx-auto space-y-10", children }),
      /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx(Footer, {}) })
    ] })
  ] });
}
function PageHeader({
  icon,
  title,
  description,
  actions
}) {
  return /* @__PURE__ */ jsxs("header", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-6", children: [
      icon,
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold leading-tight tracking-tight mb-0.5", children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: description })
      ] })
    ] }),
    actions && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-x-2", children: actions })
  ] });
}
function Section({
  className,
  children
}) {
  return /* @__PURE__ */ jsx("section", { className: cn("relative mb-10", className), children });
}
export {
  AppLayout as A,
  Command as C,
  Dialog as D,
  PageHeader as P,
  Section as S,
  DialogTrigger as a,
  DialogContent as b,
  DialogHeader as c,
  DialogTitle as d,
  DialogDescription as e,
  DialogFooter as f,
  Avatar as g,
  AvatarImage as h,
  AvatarFallback as i,
  DialogClose as j,
  Popover as k,
  PopoverTrigger as l,
  PopoverContent as m,
  CommandInput as n,
  CommandEmpty as o,
  CommandGroup as p,
  CommandItem as q
};
