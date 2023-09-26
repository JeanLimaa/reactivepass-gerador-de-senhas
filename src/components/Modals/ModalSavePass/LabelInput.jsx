export default function LabelInput({ text, name, disabled, value, onChange, passwordExists }) {

    return (
        <label htmlFor={name} className='flex flex-col p-3 gap-2'>
            <span className='text-lg'>{text}</span>
            {passwordExists && <span className='text-red-700 font-semibold text-sm'>Uma senha com o mesmo label já existe em seu usuario.</span>}
            <input
                value={value}
                type="text"
                name={name}
                id={name}
                disabled={disabled}
                onChange={onChange}
                className={`${disabled ? 'bg-orange-300' : 'bg-orange-400'} text-white border-2 border-gray-500 font-medium rounded-md pl-3 h-9 mr-8`}
                />
        </label>
    )
}