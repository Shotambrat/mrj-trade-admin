import SchemeAccordeon from "@/app/_components/Main/SchemeAccordeon"

export default function Scheme() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-10">
        <h2 className="text-3xl max-mdx:text-2xl font-bold">
            SCHEME OF WORK
        </h2>
        <SchemeAccordeon />
    </div>
  )
}
