export default function Button({className, text, disabled, onClick, titleHelpCircle, altHelpCircle, type}){
    const color = "bg-orange-400 hover:bg-orange-500"
    return(
        <div className="flex w-full items-center relative">
            <button type={type} onClick={onClick} className={`${className || color} w-full p-2 rounded duration-custom ease-custom hover:text-white ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
             disabled={disabled}>{text}</button>
             {disabled ? (
                <img src="/help-circle.svg"
                 alt={altHelpCircle}
                 title={titleHelpCircle}
                 className="absolute right-0"
                 />
             ): null}
        </div>
    )
}