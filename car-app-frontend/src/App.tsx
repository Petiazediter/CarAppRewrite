import { BrowserRouter } from 'react-router-dom';
import { Footer } from './components/shared/footer/Footer';
import { DatabaseProvider } from './context/DatabaseContext';
import ThemeContextProviderComponent from './context/ThemeContext';
import UserContextProvider from './context/UserContext';
import 'antd/dist/antd.css';
import './index.css';
import RouterComponent from './RouterComponent';
import { FunctionComponent } from 'react';

const App: FunctionComponent = () => {
	return (
		<UserContextProvider>
			<ThemeContextProviderComponent>
				<DatabaseProvider>
					<BrowserRouter>
						<RouterComponent />
						<Footer />
					</BrowserRouter>
				</DatabaseProvider>
			</ThemeContextProviderComponent>
		</UserContextProvider>
	);
};

export default App;
