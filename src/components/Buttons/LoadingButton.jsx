'use client'
import Spinner from "../Spinner/SpinnerGlobal";
import Button from "@/components/Buttons/DefaultButton";

export default function LoadingButton({text, isFormSubmitting, onClick, color}){
    return(
        <Button
                type="submit"
                text={!isFormSubmitting ? `${text}` : (
                  <Spinner color="ligth" width="1.5rem" heigth="1.5rem" />
                )}
                onClick={onClick}
                disabled={isFormSubmitting}
                className={`${color || 'bg-blue-500 hover:bg-blue-600 text-white'} w-full duration-custom delay-custom rounded p-2 cursor-pointer`}
        />
    )
}