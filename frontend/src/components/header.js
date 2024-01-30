import { useState } from "react";
// import BirdsAdd from "./birdsAdd";

export default function Header()
{
    return(
        <header className="bg-banner grid grid-cols-5 h-24 justify-center items-center">
            <h1 className="text-2xl grid grid-flow-row bg-side-gray text-center">
                <span className="bg-side-gray">MIE</span>
                <span>PORTAL</span>
            </h1>

            <nav className="row-span-4"> 
                <ul> 
                    <li>
                        〇
                    </li>
                    <li>
                        〇
                    </li>
                </ul>
            </nav>
        </header>
    )
}