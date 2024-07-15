import fs from 'fs';

export const GET = async ({ url }) => {
	let news: {
        trump: {
            offset: number;
            avaliable: number;
            number: number;
            news: {
                id: number;
                title: string;
                text: string;
                summary: string;
                url: string;
                image: string;
                video: string | null;
                publish_date: string;
                author: string;
                language: string;
                source_country: string;
                sentiment: number;
            }[]
        };
        biden: {
            offset: number;
            avaliable: number;
            number: number;
            news: {
                id: number;
                title: string;
                text: string;
                summary: string;
                url: string;
                image: string;
                video: string | null;
                publish_date: string;
                author: string;
                language: string;
                source_country: string;
                sentiment: number;
            }[]
        };
    } = {
        trump: JSON.parse(fs.readFileSync('./src/routes/api/news/trumpNews.json', 'utf8')),
        biden: JSON.parse(fs.readFileSync('./src/routes/api/news/bidenNews.json', 'utf8'))
    };

    let tAvgSent = 0;

    for (let i = 0; i < news.trump.news.length; i++) {
        tAvgSent += news.trump.news[i].sentiment;
    }

    tAvgSent = tAvgSent / news.trump.news.length;

    let bAvgSent = 0;

    for (let i = 0; i < news.biden.news.length; i++) {
        bAvgSent += news.biden.news[i].sentiment;
    }

    bAvgSent = bAvgSent / news.biden.news.length;

    let returnVal = {
        trump: {
            averageSentiment: tAvgSent,
            total: news.trump.avaliable,
            latest: news.trump.news.slice(0, 10)
        },
        biden: {
            averageSentiment: bAvgSent,
            total: news.biden.avaliable,
            latest: news.biden.news.slice(0, 10)
        }
    };

    for (let i = 0; i < 10; i++) {
        returnVal.trump.latest[i] = {
            title: returnVal.trump.latest[i].title,
            url: returnVal.trump.latest[i].url,
            image: returnVal.trump.latest[i].image,
            sentiment: returnVal.trump.latest[i].sentiment
        }
        returnVal.biden.latest[i] = {
            title: returnVal.biden.latest[i].title,
            url: returnVal.biden.latest[i].url,
            image: returnVal.biden.latest[i].image,
            sentiment: returnVal.biden.latest[i].sentiment
        }
    }

    return new Response(JSON.stringify(returnVal));
};

export const config = {
	runtime: 'nodejs18.x'
};
