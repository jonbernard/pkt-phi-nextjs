import { accent } from "@/utils/colors";

interface PageHeaderProps {
  heading: string,
  text?: string,
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="container mx-auto mt-16 mb-8 lg:mb-16 px-4 w-full flex flex-col items-end max-w-screen-xl">
      {text && <span className={`${accent.text} font-bold`}>{text}</span>}
      <h2 className="text-7xl mt-2 lg:text-9xl font-bold">{heading}</h2>
    </div>
  );
}
