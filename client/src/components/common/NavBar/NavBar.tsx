import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import logo from 'assets/images/logo.png';
// import logo2 from 'assets/images/logo2.png';
import { userEmail, studentName, deviceStatus } from 'store/RecoilState';
import api from '../../../api';
import { NavBarWrapper, NavBarLink } from './style';

function NavBar() {
	const userMail = useRecoilValue(userEmail);
	const setUserMail = useSetRecoilState(userEmail);
	const setStudentName = useSetRecoilState(studentName);
	const setDeviceStatus = useSetRecoilState(deviceStatus);

	const handleLogout = async () => {
		try {
			await api.post('/member/command', {
				memberEmail: userMail,
				memberCommand: 'logout',
			});
			setUserMail('');
			setStudentName('');
			setDeviceStatus('');
			const response = await api.post('/member/logout');
			// resetUserEmail();
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<NavBarWrapper>
			<div className="nav-container">
				<div className="main_logo">
					<Link to="/main">
						<img src={logo} alt="" />
					</Link>
				</div>
				{/* <div className="main_logo">
					<Link to="/main">
						<img src={logo2} alt="" />
					</Link>
				</div> */}
				<ul>
					<li>
						<NavBarLink to="/teaminfo" className={({ isActive }) => (isActive ? 'active' : '')}>
							팀 소개
						</NavBarLink>
					</li>
					<li>
						<NavBarLink to="/simulationlist" className={({ isActive }) => (isActive ? 'active' : '')}>
							시뮬레이션
						</NavBarLink>
					</li>
					<li>
						<NavBarLink to="/gamelist" className={({ isActive }) => (isActive ? 'active' : '')}>
							게임
						</NavBarLink>
					</li>
					<li>
						<NavBarLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}>
							마이페이지
						</NavBarLink>
					</li>
					{userMail ? (
						<li>
							<Link to="/main" onClick={handleLogout}>
								로그아웃
							</Link>
						</li>
					) : (
						<li>
							<NavBarLink to="/" onClick={handleLogout}>
								로그인
							</NavBarLink>
						</li>
					)}
				</ul>
			</div>
		</NavBarWrapper>
	);
}

export default NavBar;
