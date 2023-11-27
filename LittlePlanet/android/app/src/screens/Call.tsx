import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CallingComponent from '../components/CallingComponent';
import PhoneKeyComponent from '../components/PhoneKeyComponent';
import {StackNavigationProp} from '@react-navigation/stack';

import {MemberAPI} from '../utils/MemberAPI';

type CallProps = {
  navigation: StackNavigationProp<any, 'Call'>;
};

const Call = ({navigation}: CallProps) => {
  // 상태 추가: 현재 전화를 거는 중인지 통화 중인지 결정
  const [inCall, setInCall] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  // const email = MemberAPI.getEmail();
  // console.log('이메일 받아왔니?', email);

  // 전화를 걸면 이 함수를 호출하여 상태를 업데이트
  const handleCallInitiation = (number: string) => {
    setPhoneNumber(number); // 전화번호 상태 설정
    setInCall(true); // 통화 상태를 true로 변경
  };

  useEffect(() => {
    const fetchEmailAndConnect = async () => {
      try {
        const storedEmail = await MemberAPI.getEmail();
        console.log('이메일 받아왔니?', storedEmail);

        // const newSocket = new WebSocket('ws://192.168.100.85:7777');
        const newSocket = new WebSocket('wss://littleplanet.kids:17777');

        newSocket.onopen = () => {
          console.log('WebSocket connection established.');

          // 소켓이 열린 후에 핸드셰이크를 수행
          const handShake = {
            type: 'app',
            email: storedEmail,
          };
          newSocket.send(JSON.stringify(handShake));
          console.log('핸드셰이크 전송 성공');

          setSocket(newSocket);
        };

        newSocket.onclose = () => {
          console.log('WebSocket connection closed.');
        };

        // 컴포넌트가 언마운트될 때 소켓을 닫습니다.
        return () => {
          newSocket.close();
          console.log('콜링으로 넘어간다');
        };
      } catch (error) {
        console.error('이메일을 가져오는 중 오류가 발생했습니다', error);
      }
    };

    // 정의한 비동기 함수를 호출합니다.
    fetchEmailAndConnect();
  }, []);

  useEffect(() => {
    if (inCall && socket) {
      const goOneMessage = {
        type: 'page',
        content: 1,
      };
      socket.send(JSON.stringify(goOneMessage));
    }
  }, [inCall]);

  return (
    <View style={styles.container}>
      {inCall ? (
        // 통화 중 상태면 CallingComponent를 표시
        <CallingComponent
          phoneNumber={phoneNumber}
          onEndCall={() => setInCall(false)} // 통화 종료 함수 전달
        />
      ) : (
        // 아니면 PhoneKeyComponent를 표시
        <PhoneKeyComponent
          onCallInitiated={handleCallInitiation} // 전화 시작 함수 전달
        />
        
      )}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Main')}>
        <Icon name="home" size={30} color="green" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'GowunDodum-Regular',
    fontSize: 20,
    color: 'green',
    marginBottom: 30,
  },
});

export default Call;
