import Logo from "@/app/_components/Header/Logo";
import Navigation from "@/app/_components/Header/Navigation";
import Tools from "@/app/_components/Header/Tools";

export default function Header() {
  const data = [
    {
        title: 'Categories',
        slug: 'categorie',
    },
    {
        title: 'About us',
        slug: 'about',
    },
    {
        title: 'Partners',
        slug: 'partners',
    },
    {
        title: 'News',
        slug: 'news',
    },
    {
        title: 'Contacts',
        slug: 'contacts',
    },
]
  return (
    <header className="w-full bg-white py-4 px-2 h-[90px] max-mdx:h-[70px] shadow-2xl">
      <div className="w-full max-w-[1440px] flex justify-between gap-2 h-full mx-auto">
        <Logo />
        <Navigation navOptions={data}/>
        <Tools navOptions={data}/>
      </div>
    </header>
  )
}
