export default function Footer() {
  let today = new Date();
  let year = today.getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">&copy;{year} Galam</p>
    </footer>
  );
}
