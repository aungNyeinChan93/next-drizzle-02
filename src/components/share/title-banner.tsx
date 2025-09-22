import Link from "next/link";
import React, { ComponentProps, FC, ReactNode } from "react";

interface Props extends ComponentProps<typeof Link> {
  children: ReactNode;
  icon?: ReactNode | null;
}

const TitleBanner: FC<Props> = ({ children, ...props }) => {
  return (
    <React.Fragment>
      <div className="p-4 bg-sky-200 flex justify-between items-center w-full">
        <p className="text-2xl font-semibold tracking-wider ">{children}</p>
        <Link {...props}>{props.icon || "➕"}</Link>
      </div>
    </React.Fragment>
  );
};

export default TitleBanner;
