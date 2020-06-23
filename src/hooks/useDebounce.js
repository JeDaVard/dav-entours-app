import {useEffect} from "react";

export default function useDebounce(fn, ms, deps) {
    let timer;

   useEffect(() => {
       timer = setTimeout(() => {
           fn.apply(this, arguments)
       }, ms)

       return () => {
           clearTimeout(timer);
           timer = null;
       }
       // when we add the fn as a dep, we get an additional call
       // but at the same time when we use this logic in a component
       // directly it works properly event with the fn dep

       // UPDATE AFTER 1 MINUTE
       // after we removed the fn from here, we add it as a dep
       // when we use this useDebounce and it works as expected

       // because here the fn is changing, so it triggers to
       // make a useEffect update rerender again, but outside of
       // this hook when we pass the original function, it is not
       // changed after useDebounce useEffect cycle
   }, [...deps]);
}