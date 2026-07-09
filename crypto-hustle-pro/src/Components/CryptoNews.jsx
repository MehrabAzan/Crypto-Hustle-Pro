import { useEffect, useState } from "react"

function CryptoNews() {
    const [newsList, setNewsList] = useState(null)
    const [newsError, setNewsError] = useState(null)

    useEffect(() => {
        const getNewsArticles = async () => {
            try {
                const response = await fetch(
                    "https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss"
                )
                const json = await response.json()

                if (!response.ok || json.status !== "ok" || !json.items?.length) {
                    throw new Error("Unable to load crypto news.")
                }

                setNewsList(
                    json.items.slice(0, 10).map((article) => ({
                        title: article.title,
                        url: article.link,
                    }))
                )
            } catch (error) {
                setNewsError("Unable to load crypto news.")
                setNewsList([])
                console.error(error)
            }
        }
        getNewsArticles()
    }, [])

    return (
        <div>
            <h3>Crypto News</h3>
            {newsList === null && !newsError && <p className="news-status">Loading news...</p>}
            {newsError && <p className="news-status">{newsError}</p>}
            <ul className="side-list">
                {newsList?.map((article) => (
                    <li className="news-article" key={article.url}>
                        <a href={article.url}>{article.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CryptoNews
