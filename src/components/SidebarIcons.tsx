import { ReactElement, SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGElement>) => ReactElement;
  title: string;
  onClick?: () => {};
}

function SidebarIcons({ Icon, title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.()}
      className="group relative flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-100"
    >
      <Icon className="h-6 w-6" />
      <span
        className="invisible absolute top-11 -left-3 w-[74px] 
          rounded bg-slate-400 py-1 text-center text-[12px] font-bold
           text-white opacity-100 group-hover:visible lg:hidden"
      >
        {title}
      </span>
      <p className="group-hover:text-twitter hidden text-base font-light lg:inline-flex lg:text-xl">
        {title}
      </p>
    </div>
  );
}

export default SidebarIcons;
