import { Template } from "tinacms";
import { ColorPickerOptions } from "../components/subtemplates/tina-form-elements/color-selector";
import { defaultBackgroundOptions } from "../internal/default-config/default-bg-options";
import { backgroundSchema } from "./background.schema";

const LogoCarouselSchemaGenerator: (options?: {backgroundColors?: ColorPickerOptions, previewSrc?: string}) => Template = (options = {}) => {
    return {
        name: "logoCarousel",
        label: "<SSW> Logo Carousel",
        ui: {
            defaultItem: {
                heading: "Lorem Ipsum",
                logos: [
                    {
                        logo: "",
                        altText: "Logo",
                    },
                ],
            },
            ...(options?.previewSrc ? {previewSrc: options.previewSrc} : {}),
        },
        fields: [
            backgroundSchema(options?.backgroundColors ?? defaultBackgroundOptions),
            {
                type: "string",
                label: "Heading",
                name: "heading",
                description: "Heading text for the logo carousel.",
            },
            {
                type: "boolean",
                label: "Mask Images and Whiten",
                name: "isWhiteImages",
                description: "Completely saturates images so they appear white.",
            },
            {
                type: "object",
                label: "Logos",
                name: "logos",
                description: "Individual logos in the carousel.",
                list: true,
                ui: {
                    itemProps: (item) => {
                        return { label: item?.altText ?? "Logo" };
                    },
                },
                fields: [
                    {
                        type: "image",
                        label: "Logo Source",
                        name: "logo",
                        description: "The image to display in the carousel.",
                    },
                    {
                        type: "string",
                        label: "Alt Text",
                        name: "altText",
                        description:
                            "Alt text for the logo image. Deafults to 'Logo' under the hood.",
                    },
                ],
            },
        ],
    } as Template;
};

export default LogoCarouselSchemaGenerator;
