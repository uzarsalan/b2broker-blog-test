export function Header() {
  return (
    <header className="border-b-[1px] border-black">
      <nav className="container mx-auto">
        <ul className="flex gap-4 px-10 py-4 text-2xl">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/tags">Tags</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
