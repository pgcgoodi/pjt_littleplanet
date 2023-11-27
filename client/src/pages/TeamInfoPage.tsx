import React from 'react';
import styled from 'styled-components';
import { RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import teaminfos from '../dummys/teaminfo';
import NavBar from '../components/common/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

const TeamInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	.container {
		display: grid;
		grid-template-columns: repeat(3, 1fr); // 한 행에 3개의 카드
		gap: 20px; // 카드 간격
		padding: 20px; // 여백 추가
	}
	.info-text {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	.like-btn {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
`;

function TeamInfoPage() {
	// // 각 팀의 좋아요 수를 관리하는 상태 배열을 생성합니다.
	// const [likes, setLikes] = useState(teaminfos.map(() => 0));
	// const [liked, setLiked] = useState(teaminfos.map(() => false));

	// // 좋아요 버튼 클릭 핸들러
	// const handleLike = (index: number) => {
	// 	const newLikes = [...likes];
	// 	const newLiked = [...liked];
	// 	newLikes[index] += 1;
	// 	newLiked[index] = true; // 좋아요 상태 업데이트
	// 	setLikes(newLikes);
	// 	setLiked(newLiked);
	// };
	return (
		<div>
			<NavBar />
			<TeamInfoWrapper>
				<div className="info-text">
					<RocketLaunchIcon className="h-6 w-6 m-4" />
					<Typography variant="h3" color="blue-gray" className="text-center">
						소행성 탐사 팀원을 소개합니다!
					</Typography>
					<SparklesIcon className="h-6 w-6 m-4" />
				</div>
				<div className="container">
					{teaminfos.map((teaminfo) => (
						<div key={teaminfo.id} className="info-items">
							<Card className="w-96">
								<CardHeader shadow={false} floated={false} className="h-96">
									<img
										className="h-96 w-full rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50 hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
										src={teaminfo.imageUrl}
										alt={teaminfo.name}
									/>
								</CardHeader>
								<CardBody>
									<div className="mb-2 flex items-center justify-between">
										<Typography color="blue-gray" className="font-medium">
											{teaminfo.name}
										</Typography>

										<Typography color="blue-gray" className="font-medium">
											{teaminfo.role}
										</Typography>
									</div>
									<Typography variant="small" color="gray" className="font-normal opacity-75">
										{teaminfo.description}
									</Typography>
								</CardBody>
								<CardFooter className="pt-0">
									<div className="like-btn">
										{/* <Button
											ripple={false}
											className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
											onClick={() => handleLike(index)}
										>
											<Typography>좋아요</Typography>
										</Button>
										{liked[index] ? (
											<HeartSolidIcon className="h-6 w-6 m-4 text-red-500" /> // 좋아요가 눌린 경우 빨간색 하트 아이콘
										) : (
											<HeartOutlineIcon className="h-6 w-6 m-4" /> // 좋아요가 눌리지 않은 경우 기본 하트 아이콘
										)}
										<Typography className="text-blue-gray-900">{likes[index]}</Typography> */}
									</div>
								</CardFooter>
							</Card>
						</div>
					))}
				</div>
			</TeamInfoWrapper>
			<Footer />
		</div>
	);
}

export default TeamInfoPage;
