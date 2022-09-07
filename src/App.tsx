import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import PullRequests from './pages/PullRequests';
import Repositories from './pages/Repositories';
import Workspaces from './pages/Workspaces';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ComingSoon from './pages/ComingSoon';
import PageNotFound from './pages/PageNotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path='/' element={<Workspaces />} />
          <Route path='/signin' element={<SignIn />} />

          <Route path='/applications' element={<ComingSoon />} />
          <Route path='/resources' element={<ComingSoon />} />
          <Route path='/references' element={<ComingSoon />} />
          <Route path='/environments' element={<ComingSoon />} />

          <Route
            path='/:workspaceSlug/repositories'
            element={<Repositories />}
          />
          <Route
            path='/:workspaceSlug/repositories/:repositorySlug/pullrequests'
            element={<PullRequests />}
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
