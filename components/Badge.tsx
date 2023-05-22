interface BadgeProps {
    text: string;
    color: string;
    hoverColor?: string;
}

export default function Badge({ text, color, hoverColor }: BadgeProps) {
    return (
        <span
            className={`grid place-content-center font-primary bg-${color} hover:bg-${hoverColor} rounded-md p-1 `}
        >
            Search recipes
        </span>
    );
}
