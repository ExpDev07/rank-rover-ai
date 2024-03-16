import { cn } from "@/lib/utils"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export default function SelectableCard({
  isSelected,
  onSelect,
  emoji,
  text,
  helpText,
  className,
  children,
}) {
  return (
    <button
      className={cn('relative flex flex-col items-center justify-center w-full h-32 gap-3 border-2 rounded-md', isSelected && 'border-primary', className)}
      onClick={() => onSelect()}
      aria-selected={isSelected}
    >
      {text ? (
        <>
          <span className="text-2xl">{emoji}</span>
          <span className="">{text}</span>
        </>
      ) : (
        {children}
      )}
      {helpText && (
        <div className="absolute top-2 right-2">
          <HoverCard>
            <HoverCardTrigger className="flex items-center justify-center w-5 h-5 text-sm font-bold text-black border rounded-lg hover:bg-primary hover:text-primary-foreground">
              ?
            </HoverCardTrigger>
            <HoverCardContent>
              {helpText}
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </button>
  )
}
