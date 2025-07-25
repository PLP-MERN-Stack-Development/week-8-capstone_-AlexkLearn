const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center py-6 mt-10 text-sm text-gray-600">
      <p>© {new Date().getFullYear()} MtaaFix. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <a href="#" className="hover:text-primary">FAQ</a>
        <a href="#" className="hover:text-primary">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;