const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-stretch justify-between h-[60px] bg-background/90 backdrop-blur-sm">
            <div className="border-r border-border-color border-solid p-4 flex items-center">
                <span className="font-sans text-secondary-text italic">
                    not
                </span>
                <span className="font-serif text-secondary-text">alim</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8 p-4">
                <a
                    href="/about"
                    className="text-secondary-text hover:text-primary-text transition-colors"
                >
                    About
                </a>
                <a
                    href="/work"
                    className="text-secondary-text hover:text-primary-text transition-colors"
                >
                    Work
                </a>
                <a
                    href="/contact"
                    className="text-secondary-text hover:text-primary-text transition-colors"
                >
                    Contact
                </a>
            </nav>

            <div className="border-l border-border-color border-solid p-4 flex items-center">
                <span className="text-sm text-secondary-text">
                    Available for work
                </span>
            </div>
        </header>
    );
};

export default Header;
