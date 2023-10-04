import { useGenerationFunctions } from '@/hooks/section-generate-functions/useGenerationFunctions'

export default function InputLengthPass({ className, range, passLength, setPassLength, setValuePass }) {
    const { generatePassword } = useGenerationFunctions();

    //alterações no comprimento da senha
    function handleLengthChange(ev) {
        let newValue = parseInt(ev.target.value);
        if (newValue > 500) newValue = 500;
        else if (newValue < 5) newValue = 5;
        else if (isNaN(newValue) || typeof newValue === 'undefined' || newValue === null || newValue < 0) newValue = 12;
        setPassLength(newValue);
        setValuePass(generatePassword(newValue));
    }

    return (
        <input
            key={range ? 1 : 2}
            type={range ? "range" : "number"}
            name="Comprimento da senha"
            id={range && "length-pass"}
            min={5}
            max={500}
            value={passLength}
            onChange={handleLengthChange}
            className={className}
        />
    )
}