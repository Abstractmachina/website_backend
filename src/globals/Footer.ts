
const Footer: any = {
    slug: 'footer',
    access: {
        read: () => true
    },
    labels: {
        singular: 'Footer',
        plural: 'Footers',
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