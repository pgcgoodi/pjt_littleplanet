import { Simulation } from '../types/simulation';

const simulations: Simulation[] = [
	{
		id: 1,
		name: '119에 신고해요',
		description:
			'안전한 생활을 위해 꼭 필요한 긴급구조 119!\n아이들이 위급한 상황을 목격했을 때,\n직접 119에 전화해 볼 수 있습니다.',
		need: '※ 교과서 "안전한생활" 2단원 "119에 신고해요" 연계',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/119%EC%97%90+%EC%8B%A0%EA%B3%A0%ED%95%B4%EC%9A%94.png',
	},
	{
		id: 2,
		name: '소화기를 찾아요',
		description: '집에 불이 났어요!\n먼저 집에 소화기가 있는지 찾아볼까요?',
		need: '준비물 : 신고를 도와줄 스마트폰',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/%EC%86%8C%ED%99%94%EA%B8%B0%EB%A5%BC+%EC%B0%BE%EC%95%84%EC%9A%94.png',
	},
	{
		id: 3,
		name: '가스냄새가 나요',
		description: '집에서 가스냄새가 나면, 어떻게 해야 할까요?',
		need: '준비물 : 신고를 도와줄 스마트폰',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/%EA%B0%80%EC%8A%A4%EB%83%84%EC%83%88%EA%B0%80%EB%82%98%EC%9A%94(new).png',
	},
];

export default simulations;
