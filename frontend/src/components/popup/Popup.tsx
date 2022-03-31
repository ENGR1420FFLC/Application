import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PropTypes = {
    close: () => any
    children: any
}

const Popup = (props: PropTypes) => {
    const [container, setContainer]: any = useState(null);
    const newWindow: any = useRef(null);

    useEffect(() => {
        // Create container element on client-side
        setContainer(document.createElement("div"));
    }, []);

    useEffect(() => {
        // When container is ready
        if (container) {
            // Create window
            newWindow.current = window.open(
                "",
                "",
                "width=600,height=400,left=200,top=200"
            );
            // Append container
            if (newWindow.current) {
                newWindow.current.onClose = props.close
                newWindow.current.document.body.appendChild(container);
            }

            // Save reference to window for cleanup
            const curWindow = newWindow.current;

            // Return cleanup function
            return () => {
                console.log("DIe")
                
                curWindow.close()
            };
        }
    }, [container]);

    return container && createPortal(props.children, container);
};

export default Popup