import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://littleplanet.kids/api/v1/member';

export const MemberAPI = {
  login: async (email: string, password: string) => {
    console.log('이메일', email);
    console.log('비번', password);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberEmail: email,
          memberPassword: password,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 응답 헤더에서 쿠키 추출
      const cookies = response.headers.get('Set-Cookie');
      console.log('Received cookies:', cookies);

      // 쿠키 문자열에서 JWT를 추출할 때 "Object is possibly 'undefined'" 오류를 해결하기 위한 검사
      let jwt = '';
      if (cookies) {
        const jwtMatch = cookies.match(/JWT=([^;]+)/);
        jwt = jwtMatch ? jwtMatch[1] : '';
        console.log('JWT:', jwt);
      }

      // 응답 본문을 JSON으로 변환
      const data = await response.json();

      // 추출된 JWT와 데이터를 반환
      return {jwt, data};
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  // 로그인 상태 설정
  setJwtToken: async (jwtToken: string | null) => {
    // 토큰을 안전한 저장소에 저장 예: AsyncStorage, SecureStore 등
    if (jwtToken === null) {
      AsyncStorage.removeItem('jwtToken');
      return;
    }
    try {
      await AsyncStorage.setItem('jwtToken', jwtToken);
    } catch (error) {
      console.error('Setting JWT token failed', error);
      throw error;
    }
  },

  // 로그인 상태 확인
  getJwtToken: async () => {
    // 저장된 토큰을 검색
    try {
      const jwtToken = await AsyncStorage.getItem('jwtToken');
      return jwtToken;
    } catch (error) {
      console.error('Getting JWT token failed', error);
      throw error;
    }
  },
  setEmail: async (email: string) => {
    try {
      await AsyncStorage.setItem('userEmail', email);
    } catch (error) {
      console.error('Error saving the email', error);
      throw error;
    }
  },

  getEmail: async () => {
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      if (userEmail !== null) {
        return userEmail;
      }
    } catch (error) {
      console.error('Error fetching the email', error);
      throw error;
    }
  },
};
