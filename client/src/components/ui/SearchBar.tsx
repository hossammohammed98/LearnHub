import {Search} from 'lucide-react'
interface SearchBarProps{
    placeholder:string
}
function SearchBar({placeholder}:SearchBarProps) {
    return (
        <div className="relative w-full max-w-md sm:max-w-xl">
            <input
                type="text"
                className="w-full rounded-lg p-3 pr-11 bg-[#eaf2ef] outline-none text-right font-medium placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                placeholder={placeholder}
            />

            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
            </div>
        </div>
    )
}

export default SearchBar
