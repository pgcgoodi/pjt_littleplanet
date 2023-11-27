import React from 'react';
import logo from 'assets/images/logo.png';
import { FooterWrapper } from './style';

function Footer() {
	return (
		<FooterWrapper>
			<div className="footer-container">
				<div>
					<div>
						이용약관 | 개인정보처리방침 | <a href="/teaminfo"> 팀 소개 </a>| Gitlab | 삼성 청년 SW 아카데미, 9기 C203 |
					</div>

					<div>ⓒ 소행성 C203 All rights reserved </div>
				</div>
				<div>
					<img src={logo} alt="" />
				</div>
			</div>
		</FooterWrapper>
	);
}

export default Footer;
