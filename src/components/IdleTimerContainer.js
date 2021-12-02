import React, { useRef } from "react";
import IdleTimer from "react-idle-timer";

const IdleTimerContainer = (props) => {

    const idleTimerRef = useRef(null);

    return (
        <div>
            <IdleTimer
                ref={idleTimerRef}
                timeout={2 * 60 * 1000}
                onIdle={props.onIdle}
            >
            </IdleTimer>
        </div>
    )
}

export default IdleTimerContainer;