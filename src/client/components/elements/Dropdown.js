import {createContext, h} from 'preact';
import {useContext, useState} from "preact/hooks";

const DropdownContext = createContext(false);

export const DropdownItem  = ({children, className, divider, onClick, ...props}) => {
    let [_, setState] = useContext(DropdownContext);
    const handleClick = (e) => {
        setState(false);
        onClick && onClick(e);
    };

    return divider
        ? (<div className="dropdown-divider" />)
        : (<a onClick={handleClick} className={`dropdown-item ${className || ''}`} {...props}>{children}</a>)
};

const handleClick = (e, container, toggle) => {
    if (e && (e.which === 3 || (e.type === 'keyup' && e.which !== 9))) return;

    if (container.contains(e.target) && container !== e.target && (e.type !== 'keyup' || e.which === 9)) {
        return;
    }

    toggle(e);
};

export const DropdownMenu = ({children, tag, ...props}) => {
    let [isActive] = useContext(DropdownContext);

    const Tag = tag || 'div';
    return (
        <Tag {...props} className={"dropdown-menu dropdown-menu-right fade" + (isActive ? ' show' : '')}>
            {children}
        </Tag>
    );
};

export const DropdownToggle = ({children, className, ...props}) => {
    let [active, setActive] = useContext(DropdownContext);

    return (
        <button
            className={"dropdown-toggle " + (className || '')}
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded={active ? 'true' : 'false'}
            onClick={() => setActive(!active)}
            {...props}
        >
            {children}
        </button>
    )
};

export const Dropdown = ({className, show, toggle, ...props}) => {
    return (
        <DropdownContext.Provider value={[show, toggle]}>
            <div className={"dropdown " + (className || '')}>
                {props.children}
            </div>
        </DropdownContext.Provider>
    );
};

export const UncontrolledDropdown = ({className, ...props}) => {
    let [show, toggle] = useState(false);

    return (<Dropdown show={show} toggle={() => toggle(!show)} {...props} />)
};

UncontrolledDropdown.Menu = DropdownMenu;
UncontrolledDropdown.Item = DropdownItem;
UncontrolledDropdown.Toggle = DropdownToggle;

export default UncontrolledDropdown;