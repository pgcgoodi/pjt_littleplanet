import { Game } from '../types/game';

const games: Game[] = [
	{
		id: 1,
		name: '분리수거를 해요',
		description: '하늘에서 쓰레기가 내려와요!\n분리수거를 정확히 하지 않으면, 집이 더러워질 수 있어요!',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/%EB%B6%84%EB%A6%AC%EC%88%98%EA%B1%B0+%ED%95%B4%EB%B4%90%EC%9A%94.png',
	},
	{
		id: 2,
		name: '동요를 배워요',
		description: '재미있는 동요를 배워볼까요?\n노래부르기를 통해 계이름을 배워보아요!',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/%EB%8F%99%EC%9A%94%EB%A5%BC+%EC%95%8C%EC%95%84%EC%9A%94.png',
	},
	{
		id: 3,
		name: '치카포카 이닦아요',
		description: '이~ 하면 보이는 세균을 칫솔질로 물리쳐보아요!\n치카포카~치카포카~ 깨끗해지면 기분이 좋아질거에요!',
		imageUrl:
			'https://littleplanet.s3.ap-northeast-2.amazonaws.com/image/%EC%9D%B4%EB%A5%BC%EC%9E%98%EB%8B%A6%EC%95%84%EC%9A%942.png',
	},
];

export default games;
