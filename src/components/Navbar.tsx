import Link from 'next/link';
import '../styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          Smart Home
        </Link>
        
        <div className="navbar-links">
          <Link href="/devices" className="navbar-link">
            Appareils
          </Link>
          <Link href="/commands" className="navbar-link">
          Historique des commandes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 