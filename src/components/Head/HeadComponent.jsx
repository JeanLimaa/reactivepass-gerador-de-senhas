import Head from "next/head"

export default function HeadComponent({metadata}) {
    return (
        <Head>
            <meta name="robots" content="noindex, nofollow" />
            <meta name="description" content={metadata.description} />
            <meta name="language" content={metadata.locale} />
            <meta property="og:url" content={metadata.ogUrl} />
            <meta property="og:locale" content={metadata.locale} />
            <meta property="og:title" content={metadata.title} />
            <meta property="og:description" content={metadata.description} />
            <meta property="og:url" content={metadata.ogUrl} />
            <link rel="icon" href="/lock.svg" />
        </Head>
    )
}