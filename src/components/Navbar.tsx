import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>ATD Briques Durables</div>
      <ul className={styles.navLinks}>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About</Link></li>
      </ul>
      <div className={styles.cart}>
        <FaShoppingCart size={22} />
      </div>
    </nav>
  );
} 