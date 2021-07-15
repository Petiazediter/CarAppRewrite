import { FunctionComponent, useReducer } from 'react';
import { Steps } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;

const initialState = { count: 0 };

function reducer(
	state: { count: number },
	action: { type: string }
): { count: number } {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 };
		case 'decrement':
			return { count: state.count - 1 };
		default:
			throw new Error();
	}
}

const RegisterPage: FunctionComponent = () => {
	const [state, dispatcher] = useReducer(reducer, initialState);

	return (
		<>
			<Steps>
				<Step
					title={'Basic information'}
					status={state.count === 0 ? 'process' : 'finish'}
				/>
				<Step
					title={'Security'}
					status={
						state.count === 1 ? 'process' : state.count > 1 ? 'finish' : 'wait'
					}
				/>
				<Step
					title={'Verifying'}
					icon={<LoadingOutlined />}
					status={
						state.count === 2 ? 'process' : state.count > 2 ? 'finish' : 'wait'
					}
				/>
				<Step
					title={'Finish'}
					status={
						state.count === 3 ? 'process' : state.count > 3 ? 'finish' : 'wait'
					}
					icon={<SmileOutlined />}
				/>
			</Steps>
			<section>
				<h1>You are in Basic information's right now</h1>
			</section>
			<button onClick={() => dispatcher({ type: 'increment' })}>
				Next page
			</button>
			<button onClick={() => dispatcher({ type: 'decrement' })}>
				Previous page
			</button>
		</>
	);
};

export default RegisterPage;
