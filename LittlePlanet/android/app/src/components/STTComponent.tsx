import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Voice from '@react-native-community/voice';

interface STTComponentProps {
  isSTTActive: boolean;
  onSTTResult: (text: string) => void;
  socketSend: (text: string) => void;
}

// 부모 컴포넌트(CallingComponent)로부터 onSTTResult 콜백을 받아 음성 인식 결과를 전달
const STTComponent: React.FC<STTComponentProps> = ({
  isSTTActive,
  onSTTResult,
  socketSend,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const onSpeechStart = () => {
    setIsRecording(true);
    setText('');
  };

  const onSpeechEnd = () => {
    if (text) {
      console.log('최종 말 끝난 텍스트:', text);
    } else {
      console.log('음성 인식 결과가 아직 준비되지 않았습니다.');
    }
    setIsRecording(false);
  };

  // 음성 인식의 임시 결과를 처리하는 함수
  const onSpeechPartialResults = (event: any) => {
    // event.value는 배열로 임시 결과를 포함하고 있음.
    console.log('onSpeechPartialResults의 event.value:', event.value);
  };
  const onSpeechResults = (event: any) => {
    console.log('onSpeechResults의 event.value', event.value);
    // 최종 결과만을 setText로 설정
    let finalResult = event.value[0];
    setText(finalResult); // 이전 텍스트에 더하지 않고 새로운 값을 설정
    console.log('finalResult?', finalResult);
    onSTTResult(finalResult); // 부모 컴포넌트에 결과 전달
  };

  useEffect(() => {
    // text 상태가 변경될 때만 socketSend를 호출
    if (text) {
      socketSend(text);
    }
  }, [text]); // text 상태가 변경될 때마다 실행

  useEffect(() => {
    // 리스너 추가
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    // STT 활성화/비활성화를 위한 useEffect
    if (isSTTActive) {
      startRecording().catch(console.error);
    } else {
      if (isRecording) {
        stopRecording().catch(console.error);
      }
    }
    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [isSTTActive]);

  const startRecording = async () => {
    try {
      await Voice.start('ko-KR');
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'red', padding: 10, flexShrink: 1}}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  sttText: {
    color: 'red',
    padding: 10,
    flexShrink: 1,
    fontFamily: 'GowunDodum-Regular',
  }
});
export default STTComponent;
