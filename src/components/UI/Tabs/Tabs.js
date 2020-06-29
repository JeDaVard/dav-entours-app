import React, {useState, useCallback } from "react";
import classes from "./Tabs.module.css";


function Tabs({ children, defaultTab }) {
    const queryTabExist = children.find(child => child.props.label === defaultTab)
    const initialTab = queryTabExist ? queryTabExist.props.label : children[0].props.label

    const [ activeTab, setActiveTab ] = useState(initialTab)
    const handleActiveTab = useCallback(label => setActiveTab(label), [])

    const tabs = children.map( child => (
            <button
                onClick={e => {
                    e.preventDefault();
                    handleActiveTab(child.props.label)
                }}
                className={activeTab === child.props.label ? classes.activeButton : classes.button}
                key={child.props.label}
            >
                {child.props.tabName}
            </button>
        )
    )
    const tabContent = children.filter( child => child.props.label === activeTab)
    return (
        <>
            <div className={classes.box}>
                {tabs}
            </div>
            <div>
                {tabContent}
            </div>
        </>
    )
}

function Tab(props) {
    return <>{props.children}</>
}

export { Tabs, Tab}
// function Tabing({ children }) {
//     const [ activeTab, setActiveTab ] = useState(children[0].props.label)
//
//     const handleActiveTab = useCallback(label => setActiveTab(label), [])
//
//     return (
//         <div>
//             <div>
//                 {children.map( child => {
//                     const { label, tabComponent } = child.props
//                     const Tab = tabComponent || 'div'
//                     return (
//                         <Tab onClick={e => {
//                             e.preventDefault()
//                             handleActiveTab(label)
//                         }} />
//                     )
//                 })}
//             </div>
//             <div>
//                 {children.map( child => {
//                     if (child.props.label !== activeTab) return undefined
//                         return child
//                 })}
//             </div>
//         </div>
//     )
// }