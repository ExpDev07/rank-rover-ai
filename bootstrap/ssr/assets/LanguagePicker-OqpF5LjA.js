import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { B as Button, c as cn } from "./button-hFl330a_.js";
import { k as Popover, l as PopoverTrigger, m as PopoverContent, C as Command, n as CommandInput, o as CommandEmpty, p as CommandGroup, q as CommandItem } from "./Section-CEFJvy7d.js";
const languages = [
  { label: "English", value: "english" },
  { label: "Chinese", value: "chinese" },
  { label: "Hindi", value: "hindi" },
  { label: "Spanish", value: "spanish" },
  { label: "French", value: "french" },
  { label: "Arabic", value: "arabic" },
  { label: "Bengali", value: "bengali" },
  { label: "Russian", value: "russian" },
  { label: "Portuguese", value: "portuguese" },
  { label: "Indonesian", value: "indonesian" },
  { label: "Urdu", value: "urdu" },
  { label: "German", value: "german" },
  { label: "Japanese", value: "japanese" },
  { label: "Swahili", value: "swahili" },
  { label: "Marathi", value: "marathi" },
  { label: "Telugu", value: "telugu" },
  { label: "Turkish", value: "turkish" },
  { label: "Tamil", value: "tamil" },
  { label: "Vietnamese", value: "vietnamese" },
  { label: "Korean", value: "korean" },
  { label: "Italian", value: "italian" },
  { label: "Polish", value: "polish" },
  { label: "Ukrainian", value: "ukrainian" },
  { label: "Persian", value: "persian" },
  { label: "Dutch", value: "dutch" },
  { label: "Romanian", value: "romanian" },
  { label: "Greek", value: "greek" },
  { label: "Hungarian", value: "hungarian" },
  { label: "Czech", value: "czech" },
  { label: "Swedish", value: "swedish" },
  { label: "Norwegian", value: "norwegian" },
  { label: "Danish", value: "danish" },
  { label: "Finnish", value: "finnish" },
  { label: "Slovak", value: "slovak" },
  { label: "Bulgarian", value: "bulgarian" }
];
function LanguagePicker({
  value,
  onChange
}) {
  var _a;
  const [open, setOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        className: "justify-between w-full",
        children: [
          value ? (_a = languages.find((language) => language.value === value)) == null ? void 0 : _a.label : "Select language...",
          /* @__PURE__ */ jsx(CaretSortIcon, { className: "w-4 h-4 ml-2 opacity-50 shrink-0" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "p-0 w-96", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(
        CommandInput,
        {
          className: "h-9",
          placeholder: "Search language..."
        }
      ),
      /* @__PURE__ */ jsx(CommandEmpty, { children: "No language found." }),
      /* @__PURE__ */ jsx(CommandGroup, { children: languages.map((language) => /* @__PURE__ */ jsxs(
        CommandItem,
        {
          value: language.value,
          onSelect: (currentValue) => {
            onChange(currentValue === value ? "" : currentValue);
            setOpen(false);
          },
          children: [
            language.label,
            /* @__PURE__ */ jsx(
              CheckIcon,
              {
                className: cn(
                  "ml-auto h-4 w-4",
                  value === language.value ? "opacity-100" : "opacity-0"
                )
              }
            )
          ]
        },
        language.value
      )) })
    ] }) })
  ] });
}
export {
  LanguagePicker as L
};
