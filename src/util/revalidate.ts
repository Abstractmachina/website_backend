const revalidate = async (tags: string[]): Promise<void> => {
    if (!process.env.REVALIDATE_CACHE_URL || !process.env.REVALIDATE_CACHE_SECRET_TOKEN) {
        return;
    }

    for (const tag of tags) {
        const res = await fetch(process.env.REVALIDATE_CACHE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: process.env.REVALIDATE_CACHE_SECRET_TOKEN,
                tag
            }),
        });

        console.log(await res.text());
    }
};

export default revalidate;