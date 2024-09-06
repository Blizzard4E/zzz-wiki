import { type VariantProps, cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva("", {
    variants: {
        variant: {
            default:
                "text-white rounded-full bg-zblack border-[3px] border-zgray outline outline-[3px] outline-zblack text-white duration-300 ease-in-out hover:bg-white hover:border-white hover:text-zblack grid place-items-center text-white disabled:bg-white disabled:border-white disabled:text-zblack",
        },
        size: {
            default: "h-12 px-6",
            icon: "h-12 w-12",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
