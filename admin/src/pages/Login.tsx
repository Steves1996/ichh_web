import { useState } from 'react';
import { useAuth } from '../lib/auth';

export function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message ?? 'Connexion impossible');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="card login-card">
        <h1>Administration ICHH</h1>
        <p className="muted">Connectez-vous pour gérer le contenu du site.</p>
        <form onSubmit={submit}>
          <div className="field">
            <label>E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: 'var(--danger)' }}>{error}</p>}
          <button type="submit" disabled={busy} style={{ width: '100%' }}>
            {busy ? '…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
