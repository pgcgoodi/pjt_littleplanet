import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {globalStyles} from '../../../../src/styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-sound';
import {MemberAPI} from '../utils/MemberAPI';
import STTComponent from './STTComponent';

interface CallingProps {
  phoneNumber: string;
  onEndCall: () => void;
}

const CallingComponent: React.FC<CallingProps> = ({phoneNumber, onEndCall}) => {
  const [isSTTActive, setIsSTTActive] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [soundnum, setsoundnum] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // 사운드 인스턴스 생성
  const createSoundInstance = (filename: string): Promise<Sound> => {
    return new Promise((resolve, reject) => {
      const sound = new Sound(filename, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log(`Failed to load file: ${filename}`, error);
          reject(error);
          return;
        }
        resolve(sound);
      });
    });
  };

  useEffect(() => {
    async function loadAndPlaySound() {
      const signalSound = await createSoundInstance('signal.mp3');
      signalSound.play(success => {
        if (success) {
          console.log('신호음 재생 성공');
        } else {
          console.log('신호음 재생 실패');
        }
        signalSound.release();
      });
    }

    loadAndPlaySound();

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
          console.log('콜링컴포넌트 핸드셰이크 전송 성공');

          setSocket(newSocket);
        };

        newSocket.onmessage = event => {
          const eventMessage = JSON.parse(event.data);
          console.log('이벤트데이터', event.data);
          if (eventMessage.type === 'narr') {
            const narrFilename = `narr_${eventMessage.content}.mp3`;
            playSoundFile(narrFilename, () => {
              console.log(`${narrFilename} 재생됨`);
              setIsSTTActive(true);
            });
            setsoundnum(eventMessage.content);
          } else if (eventMessage.type === 'wrong') {
            const narrFilename = `narr_6.mp3`;
            playSoundFile(narrFilename, () => {
              console.log(`오답나레이션 재생됨`);
              setIsSTTActive(true);
            });
          } else if (eventMessage.type === 'end') {
            console.log('엔드메세지 받고 웹소켓 종료됨');
            newSocket.close();
            onEndCall();
          }
        };
        newSocket.onclose = () => {
          console.log('웹소켓 종료');
        };

        // 컴포넌트가 언마운트될 때 소켓을 닫습니다.
        return () => {
          newSocket.close();
          console.log('통화종료됨');
        };
      } catch (error) {
        console.error('이메일을 가져오는 중 오류가 발생했습니다', error);
      }
    };

    // 정의한 비동기 함수를 호출합니다.
    fetchEmailAndConnect();
  }, []);

  const playSoundFile = async (filename: string, callback: () => void) => {
    const soundInstance = await createSoundInstance(filename);
    soundInstance.play(success => {
      if (success) {
        console.log('나레이션 파일재생 성공');
      } else {
        console.log('Playback failed due to audio decoding errors');
      }
      soundInstance.release();
      callback();
    });
  };

  const handleSTTResult = (text: string) => {
    setTranscript(text);
    if (socket && text) {
      const textMessage = {
        type: `text${soundnum}`,
        content: text,
      };
      socket.send(JSON.stringify(textMessage));
    }
    setIsSTTActive(false);
  };

  const onEndCallModified = () => {
    if (socket) {
      socket.close();
    }
    onEndCall();
  };
  const socket_send = (text: string) => {
    if (socket && text) {
      const textMessage = {
        type: `text${soundnum}`,
        content: text,
      };
      socket.send(JSON.stringify(textMessage));
    } else {
      console.log('text 없는듯?');
    }
  };

  const toggleSTT = () => {
    setIsSTTActive(!isSTTActive);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileIconContainer}>
        <Icon name="account-circle" size={120} color="#000" />
      </View>
      <Text style={styles.contactName}>{phoneNumber}</Text>
      <Text style={styles.callStatus}>통화 중...</Text>
      <Button
        title={isSTTActive ? 'Stop STT' : 'Start STT'}
        onPress={toggleSTT}
        color={isSTTActive ? 'red' : 'blue'}
      />
      <STTComponent
        isSTTActive={isSTTActive}
        onSTTResult={handleSTTResult}
        socketSend={socket_send}
      />
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.listeningText}>듣고 있어요...</Text>
      </View>

      <TouchableOpacity
        style={styles.endCallButton}
        onPress={onEndCallModified}>
        <Icon name="call-end" size={30} color="#FFF" />
        <Text style={styles.endCallText}>통화 종료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileIconContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  contactInfoContainer: {
    alignItems: 'center',
  },
  contactName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  callStatus: {
    fontSize: 20,
    color: '#666',
    margin: 15,
    fontWeight: 'bold',
  },
  callActionContainer: {
    alignSelf: 'stretch', // 부모의 너비에 맞춤
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  endCallButton: {
    margin: 30,
    paddingHorizontal: 30,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4444',
    borderRadius: 30,
    elevation: 2, // 안드로이드에 그림자 효과
    shadowColor: '#000', // iOS에 그림자 효과
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  // endCallButton: {
  //   marginTop: 20,
  //   width: 100,
  //   height: 60,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#FF4444',
  //   borderRadius: 22,
  //   margin: 20, // 버튼 주변의 여백
  // },
  endCallText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  transcriptContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  transcriptText: {
    fontSize: 18,
    color: 'red',
  },
  activityIndicatorContainer: {
    flexDirection: 'column',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listeningText: {
    fontSize: 18,
    color: '#555',
  },
});
export default CallingComponent;
