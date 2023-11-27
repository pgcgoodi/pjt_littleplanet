import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import api from 'api';
import { CheckCircleIcon as OutlineCheckCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as SolidCheckCircleIcon } from '@heroicons/react/24/solid';
import loadingImage from 'assets/images/livecam_loading.jpg';
import Button from 'components/common/Button';
import { useSetRecoilState } from 'recoil';
import CheckStep from '../atoms/CheckStep';
import { Wrapper } from './style';
import { studentName } from '../../../store/RecoilState';

interface IStepOneProps {
	setStep: Dispatch<SetStateAction<number>>;
}

type StudentData = {
	studentSeq: number;
	studentName: string;
	studentGrade: string;
	studentClass: string;
};

function StepOne(props: IStepOneProps) {
	const { setStep } = props;
	const [activeStep, setActiveStep] = useState(1);
	const [isDone, setIsDone] = useState(false);
	const [studentInfo, setStudentInfo] = useState<StudentData[]>([]);
	const [history, setHistory] = useState<number[]>([]);
	const [checkedItems, setCheckedItems] = useState<number>();

	// 학생 이름 받아두기
	const setStudentName = useSetRecoilState(studentName);

	const handleCheckboxChange = (student: StudentData) => {
		setCheckedItems(student.studentSeq);
		setStudentName(student.studentName);
	};

	const fetchData = async () => {
		try {
			const studentResponse = await api.get('/student');
			setStudentInfo(studentResponse.data);
			const historyResponse = await api.get('/simulationHistory?seq=1');
			setHistory(historyResponse.data.map((item: { student: { studentSeq: number } }) => item.student.studentSeq));
		} catch (e) {
			console.log('api 요청 실패', e);
		}
	};

	const createHistory = async () => {
		try {
			await api.post('/simulationHistory', {
				studentSeq: checkedItems,
				simulationSeq: 1,
			});
		} catch (e) {
			console.log('api 요청 실패', e);
		}
	};

	const testClick = () => {
		if (!isDone) {
			createHistory();
			setStep(1);
			setActiveStep(2);
		}
	};

	useEffect(() => {
		if (activeStep === 1) {
			fetchData();
			setIsDone(false);
		}
	}, [activeStep]);

	return (
		<Wrapper>
			<div>
				<CheckStep activeStep={activeStep} checkNum={1} message="학생 선택" />
				<CheckStep activeStep={activeStep} checkNum={2} message="캐릭터 선택" />
				<CheckStep activeStep={activeStep} checkNum={3} message="카메라 위치 확인" />
				<CheckStep activeStep={activeStep} checkNum={4} message="캐릭터 연동 확인" />
				<CheckStep activeStep={activeStep} checkNum={5} message="시작하기!" />
			</div>
			<div>
				<div className="image-wrapper">
					<h3 className="text-4xl m-4 font-semibold text-gray-900 dark:text-white">학생 명단</h3>
					<ul className="w-50 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
						<li className="w-full pr-16 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
							<div className="flex items-center">
								<p className="w-full text-base font-medium text-gray-900 dark:text-gray-300">선택</p>
								<p className="w-full text-base font-medium text-gray-900 dark:text-gray-300">이름</p>
								<p className="w-full text-base font-medium text-gray-900 dark:text-gray-300">학년</p>
								<p className="w-full text-base font-medium text-gray-900 dark:text-gray-300">반</p>
								<p className="w-full text-base font-medium text-gray-900 dark:text-gray-300">활동 여부</p>
							</div>
						</li>
					</ul>
					<ul className="w-50 text-xl font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
						{activeStep === 1 ? (
							studentInfo.map((student) => (
								<li
									className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600 pl-10"
									key={student.studentSeq}
								>
									<div className="flex items-center pl-3">
										<input
											id="vue-checkbox"
											type="checkbox"
											value={student.studentSeq}
											onChange={() => handleCheckboxChange(student)}
											className="w-4 h-4 scale-150 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
										/>
										<label
											htmlFor="vue-checkbox"
											className="w-full py-3 ml-2 text-cl font-medium text-gray-900 dark:text-gray-300 pl-12"
										>
											{student.studentName}
										</label>
										<label
											htmlFor="vue-checkbox"
											className="w-full py-3 ml-2 text-cl font-medium text-gray-900 dark:text-gray-300"
										>
											{student.studentGrade}
										</label>
										<label
											htmlFor="vue-checkbox"
											className="w-full py-3 ml-2 text-cl font-medium text-gray-900 dark:text-gray-300 pr-8"
										>
											{student.studentClass}
										</label>
										<label
											htmlFor="vue-checkbox"
											className="w-full py-3 ml-2 text-cl font-medium text-gray-900 dark:text-gray-300 pr-10"
										>
											{history.includes(student.studentSeq) ? (
												<SolidCheckCircleIcon className="h-9 w-9" />
											) : (
												<OutlineCheckCircleIcon className="h-9 w-9" />
											)}
										</label>
									</div>
								</li>
							))
						) : (
							<img className="loading" src={loadingImage} alt="이미지 없음." />
						)}
					</ul>
				</div>
			</div>
			<Button text="다음" handleClick={() => testClick()} />
		</Wrapper>
	);
}

export default StepOne;
