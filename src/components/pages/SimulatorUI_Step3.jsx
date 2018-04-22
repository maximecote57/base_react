import React from "react";

import drawing_conclusion from '../../images/drawing_conclusion.jpg';

const SimulatorUI_Step3 = () => (

    <div className="component">
        <div className="container">
            <div className="pt-5">
                <h1 className="text-center">Bienvenue dans la grande famille d’Ophelia!</h1>
                <h4 className="pt-3 font-weight-normal text-center">Vous faites maintenant parti des 25 000 clients d’Ophelia qui s’enrichissent en se désendettant!</h4>
                <div className="text-center pt-4 pb-4">
                    <img id="drawing_conclusion" src={drawing_conclusion} />
                </div>
                <h4 className="font-weight-normal text-center">Votre avenir financier commence dès aujourd’hui!</h4>
            </div>
        </div>
    </div>

)

export default SimulatorUI_Step3;