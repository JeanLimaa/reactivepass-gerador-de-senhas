'use client'
import { Spinner } from "reactstrap"

export default function SpinnerProfile({width, heigth}){
    return (
        <Spinner
            color="info"
            style={{
                height: width,
                width: heigth
            }}
        >
            Loading...
        </Spinner>
    )
}