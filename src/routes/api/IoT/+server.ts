import googleTrends from 'google-trends-api';

export const GET = async ({ url }) => {
	try {
		const keywords: string[] = url.searchParams.getAll('keyword');
		const geo: string = url.searchParams.get('geo') || '';
		const time: number = Number(url.searchParams.get('time')) || 7;

		const date = new Date(Number(url.searchParams.get('endTime')) || new Date(Date.now()));
		date.setDate(date.getDate() - time);

		const trends = await googleTrends.interestOverTime({
			geo: geo,
			keyword: keywords,
			startTime: date
		});

		const timelineData = JSON.parse(trends).default.timelineData;
		return new Response(JSON.stringify(timelineData));
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};

export const config = {
	runtime: 'nodejs18.x'
};
