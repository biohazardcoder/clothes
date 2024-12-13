import React from "react";

function AutoFocus() {
    return (
        <input
            type="text"
            className="opacity-0  absolute top-[-500px] left-0"
            autoFocus={true}
        />
    );
}

export default AutoFocus;
