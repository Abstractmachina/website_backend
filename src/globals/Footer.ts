import { GlobalConfig } from "payload/types";

const Footer: GlobalConfig = {
    slug: 'footer',
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'bottomNavLinks',
            label: 'Bottom Navigation Links',
            type: 'array',
            fields: [
                {
                    name: 'label',
                    label: 'Label',
                    type: 'text'
                },
                {
                    name: 'link',
                    label: 'Link',
                    type: 'text'
                }
            ]
        }
    ]
}

export default Footer;