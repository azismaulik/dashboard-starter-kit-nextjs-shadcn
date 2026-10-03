import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all duration-150 outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 active:not-aria-[haspopup]:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary/95 to-primary text-primary-foreground border border-primary/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_1px_2px_0_rgba(0,0,0,0.18)] dark:from-primary dark:to-primary/90 dark:border-white/20 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_1px_3px_0_rgba(0,0,0,0.35)] hover:brightness-105 active:brightness-95 tracking-tight",
        outline:
          "border border-black/10 dark:border-white/15 bg-gradient-to-b from-white to-[#f5f5f7] dark:from-white/12 dark:to-white/6 text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_1px_2px_0_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_1px_2px_0_rgba(0,0,0,0.25)] hover:from-white hover:to-neutral-100 dark:hover:from-white/18 dark:hover:to-white/10 aria-expanded:bg-muted aria-expanded:text-foreground tracking-tight",
        secondary:
          "bg-secondary/80 hover:bg-secondary text-secondary-foreground border border-border/80 shadow-2xs backdrop-blur-sm tracking-tight",
        ghost:
          "border border-transparent text-muted-foreground hover:bg-muted/70 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "bg-destructive text-white border border-destructive/20 hover:bg-destructive/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),0_1px_2px_0_rgba(0,0,0,0.2)] hover:brightness-105 active:brightness-95 tracking-tight",
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none",
      },
      size: {
        default:
          "h-9 px-4 py-2 text-sm gap-2 rounded-[8px] has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        xs: "h-7 px-2.5 py-1 text-xs gap-1 rounded-[6px] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 px-3.5 py-1.5 text-xs gap-1.5 rounded-[6px] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 px-5 py-2.5 text-sm font-semibold gap-2 rounded-[9px] has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4 [&_svg:not([class*='size-'])]:size-4.5",
        icon: "size-9 rounded-[8px] [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-7 rounded-[6px] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[6px] [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg":
          "size-10 rounded-[9px] [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
