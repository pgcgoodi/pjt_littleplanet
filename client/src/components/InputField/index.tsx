import React from 'react';
import { InputFieldWrapper } from './style';

function InputField(message: string, setMessage: any) {
	return (
		<InputFieldWrapper>
			<input value={message} onChange={(e) => setMessage(e.target.value)} />
		</InputFieldWrapper>
	);
}

export default InputField;
