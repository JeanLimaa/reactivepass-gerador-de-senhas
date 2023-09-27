'use client'
import { Spinner } from "reactstrap"

export default function SpinnerGlobal({color, width, heigth}){
    return (
        <Spinner
            color={color}
            style={{
                height: width,
                width: heigth
            }}
        >
            Loading...
        </Spinner>
    )
}