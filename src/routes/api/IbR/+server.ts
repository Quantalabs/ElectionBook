import googleTrends from 'google-trends-api';

export const GET = async ({ url }) => {
	const keyword: string = url.searchParams.get('keyword');
	const geo: string = url.searchParams.get('geo');
	const time: number = Number(url.searchParams.get('time'));

	const date = new Date(Date.now());
	date.setDate(date.getDate() - time);

	const trends = googleTrends.interestByRegion({
		geo: geo,
		keyword: [keyword],
		startTime: date
	});

	return new Response(JSON.stringify(JSON.parse(await trends)['default']['geoMapData']));
};
