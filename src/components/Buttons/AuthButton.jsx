'use client'
import Spinner from "../Spinner/SpinnerGlobal";
import Button from "@/components/Buttons/DefaultButton";

export default function AuthButton({text, isFormSubmitting}){
    return(
        <Button
                type="submit"
                text={!isFormSubmitting ? `${text}` : (
                  <Spinner color="ligth" width="2rem" heigth="2rem" />
                )}
                disabled={isFormSubmitting}
                className="bg-blue-500 hover:bg-blue-600 duration-custom delay-custom  text-white rounded p-2 cursor-pointer"
        />
    )
}