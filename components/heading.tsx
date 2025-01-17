import { cn } from "@/lib/utils";

interface HeadingProps {
    title: string;
    description: string;
    icon: any;
    iconColor?: string;
    bgColor?: string;
}

const Heading = ({
    title,
    description,
    icon: Icon,
    iconColor,
    bgColor
}: HeadingProps) => {
    return (
        <div className="px-2 lg:px-8 flex items-center gap-x-3 mb-5 md:mb-8">
            <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                <Icon className={cn("w-10 h-10", iconColor)} />
            </div>
            <div>
                <h2 className="text-2xl font-bold">
                    {title}
                </h2>
                <p className="text-[13px] text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default Heading;