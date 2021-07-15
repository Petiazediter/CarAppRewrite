import { FunctionComponent, ReactElement, useReducer } from 'react';
import { Steps } from 'antd';
import { LoadingOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;

type State = {
	page: number;
};

enum ActionType {
	INCREMENT,
	DECREMENT,
}

type Action = {
	type: ActionType;
};

const initialState: State = { page: 0 };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case ActionType.INCREMENT:
			return { page: state.page + 1 };
		case ActionType.DECREMENT: {
			if (state.page === 0) {
				return state;
			}
			return { page: state.page - 1 };
		}
		default:
			throw new Error();
	}
}

type CustomStepProps = {
	currentPage: number;
	page: number;
	title: string;
	icon: ReactElement | null;
};

const CustomStep: FunctionComponent<{ value: CustomStepProps }> = (props) => {
	return (
		<Step
			title={props.value.title}
			status={
				props.value.currentPage === props.value.page
					? 'process'
					: props.value.currentPage > props.value.page
					? 'finish'
					: 'wait'
			}
			icon={props.value.icon != null ? props.value.icon : ''}
		/>
	);
};

const RegisterPage: FunctionComponent = () => {
	const [state, dispatcher] = useReducer(reducer, initialState);

	return (
		<>
			<Steps>
				<Step
					title={'Basic informations'}
					status={
						state.page === 0 ? 'process' : state.page > 0 ? 'finish' : 'wait'
					}
				/>
				<Step
					title={'Security'}
					status={
						state.page === 1 ? 'process' : state.page > 1 ? 'finish' : 'wait'
					}
				/>
				<Step
					title={'Verifying'}
					icon={<LoadingOutlined />}
					status={
						state.page === 2 ? 'process' : state.page > 2 ? 'finish' : 'wait'
					}
				/>
				<Step
					title={'Finish'}
					status={
						state.page === 3 ? 'process' : state.page > 3 ? 'finish' : 'wait'
					}
					icon={<SmileOutlined />}
				/>
			</Steps>
			<section>
				<h1>You are in Basic information's right now</h1>
			</section>
			<button onClick={() => dispatcher({ type: ActionType.INCREMENT })}>
				Next page
			</button>
			<button onClick={() => dispatcher({ type: ActionType.DECREMENT })}>
				Previous page
			</button>
		</>
	);
};

export default RegisterPage;
