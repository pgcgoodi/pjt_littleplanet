import React, {useState, useEffect} from 'react';
import {
  ViewStyle,
  View,
  TextStyle,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import CommonModal from '../components/CommonModal';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PhoneKeyProps {
  onCallInitiated: (phoneNumber: string) => void;
}
interface KeySounds {
  [key: string]: Sound;
  [index: number]: Sound;
}
// 각 키에 대한 사운드 인스턴스 생성
const keySounds: KeySounds = {
  '1': new Sound('key1.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('1번 키의 사운드 로드 실패:', error);
    }
  }),
  '2': new Sound('key2.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('2번 키의 사운드 로드 실패:', error);
    }
  }),
  '3': new Sound('key3.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('3번 키의 사운드 로드 실패:', error);
    }
  }),
  '4': new Sound('key4.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('4번 키의 사운드 로드 실패:', error);
    }
  }),
  '5': new Sound('key5.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('5번 키의 사운드 로드 실패:', error);
    }
  }),
  '6': new Sound('key6.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('6번 키의 사운드 로드 실패:', error);
    }
  }),
  '7': new Sound('key7.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('7번 키의 사운드 로드 실패:', error);
    }
  }),
  '8': new Sound('key8.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('8번 키의 사운드 로드 실패:', error);
    }
  }),
  '9': new Sound('key9.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('9번 키의 사운드 로드 실패:', error);
    }
  }),
  '*': new Sound('keystar.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('별 키의 사운드 로드 실패:', error);
    }
  }),
  '0': new Sound('key0.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('0번 키의 사운드 로드 실패:', error);
    }
  }),
  '#': new Sound('keyhash.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('샵 키의 사운드 로드 실패:', error);
    }
  }),
};
// const buttonPressSound = new Sound(
//   'button_press.mp3',
//   Sound.MAIN_BUNDLE,
//   error => {
//     if (error) {
//       console.log('효과음을 로드할 수 없습니다.', error);
//     }
//   },
// );

const PhoneKeyComponent: React.FC<PhoneKeyProps> = ({onCallInitiated}) => {
  const [number, setNumber] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const handleKeypadPress = (pressedKey: string | number) => {
    const updatedNumber = `${number}${pressedKey}`;
    setNumber(updatedNumber);

    // 눌린 키에 해당하는 사운드 재생
    const sound = keySounds[pressedKey];
    if (sound) {
      sound.stop(() => {
        sound.play();
      });
    }
  };

  // const handleKeypadPress = (pressedKey: string | number) => {
  //   const updatedNumber = `${number}${pressedKey}`;
  //   setNumber(updatedNumber);

  //   // 사운드를 정지하고 시작점으로 리셋 후 다시 재생(react-native sound는 한번에 하나만 처리함 -> 콜백함수로 누를때마다 소리재생 가능)
  //   buttonPressSound.stop(() => {
  //     buttonPressSound.play();
  //   });
  // };
  // 번호 지우기
  const handleBackspacePress = () => {
    setNumber(number.slice(0, -1)); // 현재 번호에서 마지막 자리를 제거
  };
  const handleCall = () => {
    // '119'라면 onCallInitiated를 호출(콜링컴포넌트로 넘어감)
    if (number === '119') {
      // signalSound.play(() => {
      onCallInitiated(number);
      // });
    } else {
      // 다른 번호일때
      // Alert.alert('통화 실패', '119를 다시 입력해볼까요?');x
      setModalMessage('119를 다시 입력해볼까요?');
      toggleModal();
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <CommonModal
        isVisible={isModalVisible}
        onRequestClose={toggleModal}
        message={modalMessage}>
        <Text style={styles.modaltext}>{modalMessage}</Text>
        <TouchableOpacity style={styles.modalbtn} onPress={toggleModal}>
          <Text style={styles.modalbtnText}>닫기</Text>
        </TouchableOpacity>
      </CommonModal>
      <Text style={styles.numberDisplay}>{number}</Text>
      <View style={styles.keypad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map(key => (
          <KeypadButton key={key} number={key} onPress={handleKeypadPress} />
        ))}
      </View>
      <View style={styles.extraButtons}>
        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
          <Icon name="phone" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backspaceButton}
          onPress={handleBackspacePress}>
          <Icon name="backspace" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const KeypadButton: React.FC<{
  number: string | number;
  onPress: (key: string | number) => void;
}> = ({number, onPress}) => {
  // 화면 너비를 기반으로 버튼 크기 계산
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 3;
  const buttonMargin = 5; // 버튼 마진 값 조정 가능
  const size =
    ((screenWidth - buttonMargin * (numColumns * 2)) / numColumns) * 0.75;

  const buttonStyle: ViewStyle = {
    width: size,
    height: size,
    margin: buttonMargin,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: size / 2,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  const textStyle: TextStyle = {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: size - 40,
  };

  return (
    <TouchableHighlight
      style={buttonStyle}
      onPress={() => onPress(number)}
      activeOpacity={0.7}
      underlayColor="#e0e0e0">
      <Text style={textStyle}>{number}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  numberDisplay: {
    fontSize: 32,
    width: '100%',
    textAlign: 'center',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40,
  },
  keypadButton: {
    width: 100,
    height: 70,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  extraButtons: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  backspaceButton: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 35,
    marginLeft: 20,
    marginTop: 20,
  },
  callButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modaltext: {
    fontFamily: 'GowunDodum-Regular',
    fontSize: 20,
    marginBottom: 15,
  },
  modalbtn: {
    borderRadius: 10,
    backgroundColor: 'yellow',
    padding: 8,
    paddingHorizontal: 20,
  },
  modalbtnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'GowunDodum-Regular',
  },
});

export default PhoneKeyComponent;
