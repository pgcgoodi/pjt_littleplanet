import React, { useState, useEffect } from 'react';
import { PencilSquareIcon, UserPlusIcon, XCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
	Button,
	Dialog,
	Card,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Alert,
	List,
	ListItem,
} from '@material-tailwind/react';
import { MemberInfoWrapper } from './style';
import api from '../../api';

type MemberData = {
	memberEmail: string;
	memberSchool: string;
};

type StudentData = {
	studentSeq: number;
	studentName: string;
	studentGrade: string;
	studentClass: string;
};

function MemberInfo() {
	const [member, setMember] = useState<MemberData | null>(null);
	const [students, setStudents] = useState<StudentData[]>([]);
	const [open, setOpen] = React.useState(false);
	const [confirmOpen, setConfirmOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);

	const [password, setPassword] = useState('');
	const [school, setSchool] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [isWrong, setIsWrong] = useState(false);
	const [isValid, setIsValid] = useState(true);

	const [studentOpen, setStudentOpen] = useState(false);
	const [newStudentName, setNewStudentName] = useState('');
	const [newStudentGrade, setNewStudentGrade] = useState('');
	const [newStudentClass, setNewStudentClass] = useState('');
	const [isStudentValid, setIsStudentValid] = useState(true);
	const handleStudentOpen = () => {
		setStudentOpen((cur) => !cur);
		setNewStudentName('');
		setNewStudentGrade('');
		setNewStudentClass('');
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSchool = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSchool(e.target.value);
	};

	const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
	};

	const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordConfirm(e.target.value);
	};

	const handleNewStudentName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewStudentName(e.target.value);
	};

	const handleNewStudentGrade = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = parseInt(e.target.value, 10); // 10은 진수를 나타냅니다.
		if (inputValue >= 1 && inputValue <= 6) {
			setNewStudentGrade(e.target.value);
		} else {
			setNewStudentGrade('');
		}
	};

	const handleNewStudentClass = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = parseInt(e.target.value, 10); // 10은 진수를 나타냅니다.
		if (inputValue >= 1 && inputValue <= 20) {
			setNewStudentClass(e.target.value);
		} else {
			setNewStudentClass('');
		}
	};

	const fetchData = async () => {
		try {
			const memberResponse = await api.get('/member');
			setMember(memberResponse.data);
			const studentResponse = await api.get('/student');
			setStudents(studentResponse.data);
		} catch (error) {
			console.log('api 요청 실패', error);
		}
	};

	const handleEdit = async () => {
		setConfirmOpen(false);
		setIsWrong(false);
		setIsValid(true);
		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
		if (newPassword) {
			if (newPassword === passwordConfirm && newPassword.match(passwordRegex)) {
				try {
					await api.put('member/edit', {
						memberPassword: password,
						memberSchool: school,
						memberNewPassword: newPassword,
					});
					setPassword('');
					setSchool('');
					setNewPassword('');
					setPasswordConfirm('');
					handleOpen();
					fetchData();
				} catch (e) {
					console.log(e);
					setIsWrong(true);
				}
			} else if (newPassword !== passwordConfirm) {
				setConfirmOpen(true);
			} else {
				setIsValid(false);
			}
		} else {
			try {
				await api.put('member/edit', {
					memberPassword: password,
					memberSchool: school,
				});
				setPassword('');
				setSchool('');
				handleOpen();
				fetchData();
			} catch (e) {
				console.log(e);
				setIsWrong(true);
			}
		}
	};

	const registerStudent = async () => {
		setIsStudentValid(true);
		if (newStudentName && newStudentGrade && newStudentClass) {
			try {
				await api.post('/student/register', {
					studentName: newStudentName,
					studentGrade: `${newStudentGrade}학년`,
					studentClass: `${newStudentClass}반`,
				});
				setNewStudentName('');
				setNewStudentGrade('');
				setNewStudentClass('');
				fetchData();
			} catch (e) {
				console.log(e);
			}
			return true;
		}
		setIsStudentValid(false);
		return false;
	};

	const handleRegister = async () => {
		await registerStudent();
	};

	const handleRegisterEnd = async () => {
		const res = await registerStudent();
		if (res === true) {
			await setStudentOpen(false);
		}
	};

	const handleDelete = async (studentSeq: number) => {
		try {
			await api.delete(`/student/delete?studentSeq=${studentSeq}`);
			fetchData();
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<MemberInfoWrapper>
			{member && (
				<div className="memberinfo">
					<Card className="p-5 m-10 bg-yellow-200 text-black">
						<div className="flex items-center m-1">
							<p className="text-3xl mr-3">회원 정보</p>
							<PencilSquareIcon className="h-6 w-6" onClick={handleOpen} />
						</div>
						<p className="m-2">이메일: {member.memberEmail}</p>
						<p className="m-2">학교명: {member.memberSchool}</p>
					</Card>
				</div>
			)}
			<div className="memberinfoimg mt-10 ml-7 mr-12" />
			<div className="studentsinfo">
				{students && (
					<Card className="p-5 m-10 bg-light-green-200 text-black">
						<div className="flex items-center justify-between m-3">
							<p className="text-4xl">학생 정보</p>
							<UserPlusIcon className="h-6 w-6" onClick={handleStudentOpen} />
						</div>
						<hr />
						<div className="student-item p-3">
							<div className="text-xl">이름</div>
							<div className="text-xl">학년</div>
							<div className="text-xl">반</div>
							<div className="text-xl">삭제</div>
						</div>
						<hr />
						<List>
							{students.map((student) => (
								<ListItem className="student-item" key={student.studentSeq}>
									<div>{student.studentName}</div>
									<div>{student.studentGrade}</div>
									<div>{student.studentClass}</div>
									<div>
										<TrashIcon className="h-5 w-5 ml-36" onClick={() => handleDelete(student.studentSeq)} />
									</div>
								</ListItem>
							))}
						</List>
					</Card>
				)}
			</div>
			<Dialog size="xs" open={open} handler={handleOpen} className="bg-transparent shadow-none">
				<Card className="mx-auto w-full max-w-[24rem]">
					<CardBody className="flex flex-col gap-4">
						<div className="flex flex-row items-center justify-between">
							<Typography variant="h4" color="blue-gray">
								회원정보 수정
							</Typography>
							<XCircleIcon onClick={handleOpen} className="h-5 w-5" />
						</div>
						<Typography className="mb-3 font-normal" variant="paragraph" color="gray">
							현재 비밀번호 입력 후, 수정할 정보를 입력하세요
						</Typography>
						<Input
							label="현재 비밀번호"
							type="password"
							value={password}
							onChange={handlePassword}
							size="lg"
							crossOrigin=""
						/>
						<Input label="OO초등학교" size="lg" value={school} onChange={handleSchool} crossOrigin="" />
						<Input
							label="새 비밀번호"
							size="lg"
							type="password"
							value={newPassword}
							onChange={handleNewPassword}
							crossOrigin=""
						/>
						<Input
							label="비밀번호를 한번 더 입력하세요."
							size="lg"
							type="password"
							value={passwordConfirm}
							onChange={handlePasswordConfirm}
							crossOrigin=""
						/>
						<Alert variant="outlined" color="red" open={confirmOpen} onClose={() => setConfirmOpen(false)}>
							비밀번호가 일치하지 않습니다.
						</Alert>
						<Alert variant="outlined" color="red" open={isWrong} onClose={() => setIsWrong(false)}>
							현재 비밀번호 입력이 바르지 않습니다.
						</Alert>
						<Alert variant="outlined" color="red" open={!isValid} onClose={() => setIsValid(true)}>
							비밀번호는 8자 이상이면서 숫자와 영어와 특수문자를 모두 포함해야 합니다
						</Alert>
					</CardBody>
					<CardFooter className="pt-0">
						<Button variant="gradient" onClick={handleEdit} fullWidth>
							정보 수정
						</Button>
					</CardFooter>
				</Card>
			</Dialog>
			<Dialog size="xs" open={studentOpen} handler={handleStudentOpen} className="bg-transparent shadow-none">
				<Card className="mx-auto w-full max-w-[24rem]">
					<CardBody className="flex flex-col gap-4">
						<div className="flex flex-row items-center justify-between">
							<Typography variant="h4" color="blue-gray">
								학생 정보 등록
							</Typography>
							<XCircleIcon onClick={handleStudentOpen} className="h-5 w-5" />
						</div>
						<Typography className="mb-3 font-normal" variant="paragraph" color="gray">
							학생 정보를 입력 후, 등록 버튼을 클릭하세요.
						</Typography>
						<Input label="이름" size="lg" value={newStudentName} onChange={handleNewStudentName} crossOrigin="" />
						<Input
							label="학년"
							size="lg"
							type="number"
							value={newStudentGrade}
							onChange={handleNewStudentGrade}
							crossOrigin=""
							min={1}
							max={6}
						/>
						<Input
							label="반"
							size="lg"
							type="number"
							value={newStudentClass}
							onChange={handleNewStudentClass}
							crossOrigin=""
							min={1}
							max={20}
						/>
						<Alert variant="outlined" color="red" open={!isStudentValid} onClose={() => setIsStudentValid(true)}>
							모든 값을 입력해주세요.
						</Alert>
					</CardBody>
					<CardFooter className="flex justify-center">
						<Button className="mr-5" variant="gradient" onClick={handleRegister}>
							계속 등록
						</Button>
						<Button variant="gradient" onClick={handleRegisterEnd}>
							등록 완료
						</Button>
					</CardFooter>
				</Card>
			</Dialog>
		</MemberInfoWrapper>
	);
}

export default MemberInfo;
