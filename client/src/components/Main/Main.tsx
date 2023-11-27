import React from 'react';
import PlayButton from 'components/Button/PlayButton';
import { NavBarLink } from 'components/common/NavBar/style';
import { MainWrapper } from './style';

function Main() {
	return (
		<MainWrapper>
			<div className="bgimage">
				<div className="main-div">
					<div className="sub-text">작은 행동으로 성장할 수 있습니다.</div>
					<div className="main-text">소 행 성</div>
					<NavBarLink to="/simulationdetail/1">
						<PlayButton text="체험하기" />
					</NavBarLink>

					<div style={{ marginTop: '20px' }}>
						<p>
							※ 체험하기를 누르시면 대표컨텐츠인 <strong>119에 신고해요</strong>로 연결됩니다.
						</p>
					</div>
				</div>
			</div>
		</MainWrapper>
	);
}

export default Main;
