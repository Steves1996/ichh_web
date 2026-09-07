import { useQuery } from '@tanstack/react-query';
import { Navigate, Route, Routes } from 'react-router-dom';
import { api } from './lib/api';
import { useAuth } from './lib/auth';
import { ContentDef } from './lib/types';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { SingletonPage } from './pages/SingletonPage';
import { CollectionPage } from './pages/CollectionPage';
import { MediaPage } from './pages/MediaPage';

export function App() {
  const { user, loading } = useAuth();

  const schema = useQuery({
    queryKey: ['schema'],
    queryFn: () => api.get<ContentDef[]>('/content/schema'),
    enabled: !!user,
  });

  if (loading) return <div className="login-wrap">Chargement…</div>;
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  const defs = schema.data ?? [];

  return (
    <Layout defs={defs}>
      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Dashboard defs={defs} />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/c/:key" element={<CollectionPage defs={defs} />} />
        <Route path="/s/:key" element={<SingletonPage defs={defs} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
