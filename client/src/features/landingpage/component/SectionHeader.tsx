interface SectionHeaderProps {
    title: String;
    subtitle?:string;
    centered?:boolean;
}


export default function SectionHeader({title, subtitle, centered = true}: SectionHeaderProps) {
    return (
        <div className={`mb-12 ${centered ? 'text-center' : 'text-right'}`}>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
            {subtitle && <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">{subtitle}</p>}
        </div>
    );
}
