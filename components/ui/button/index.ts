import { type VariantProps, cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva("", {
    variants: {
        variant: {
            default:
                "text-white rounded-full bg-zblack border-[3px] border-zgray outline outline-[3px] outline-zblack text-white duration-300 ease-in-out hover:bg-white hover:border-white hover:text-zblack grid place-items-center  disabled:bg-white disabled:border-white disabled:text-zblack",
            danger: "text-black rounded-full bg-zblack border-[3px] border-red-600 outline outline-[3px] outline-zblack  duration-300 ease-in-out hover:bg-red-600 hover:border-red-600  grid place-items-center  disabled:bg-red-600 disabled:border-red-600 disabled:text-white text-red-600 hover:text-white",
            dialog: "text-black dialog-button-border bg-zblack border-[3px] border-red-600 outline outline-[3px] outline-zblack  duration-300 ease-in-out hover:bg-red-600 hover:border-red-600  grid place-items-center  disabled:bg-red-600 disabled:border-red-600 disabled:text-white text-red-600 hover:text-white",
        },
        size: {
            default: "h-12 px-6",
            icon: "h-12 w-12",
            dialog: "h-12 w-14",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
