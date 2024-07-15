import googleTrends from 'google-trends-api';

export const GET = async ({ url }) => {
	const keyword: string = url.searchParams.get('keyword');
	const geo: string = url.searchParams.get('geo');
	const time: number = Number(url.searchParams.get('time'));

	const date = new Date(Date.now());
	date.setDate(date.getDate() - time);

	let trends = googleTrends.interestByRegion({
		geo: geo,
		keyword: [keyword],
		startTime: date
	});
	if (url.searchParams.get('endTime')) {
		const endTime = new Date(Number(url.searchParams.get('endTime')));
		const startTime = endTime;
		startTime.setDate(endTime.getDate() - time);
		trends = googleTrends.interestByRegion({
			geo: geo,
			keyword: [keyword],
			startTime: startTime,
			endTime: endTime
		});
	}

	return new Response(JSON.stringify(JSON.parse(await trends)['default']['geoMapData']));
};

export const config = {
	runtime: 'nodejs18.x'
};
