import { GlobalConfig } from "payload/types";

const Header: GlobalConfig = {
    slug: 'header',
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'logo',
            label: 'logo',
            type: 'upload',
            relationTo:'media'
        },
        {
            name: 'navLinks',
            label: 'Navigation Links',
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

export default Header;