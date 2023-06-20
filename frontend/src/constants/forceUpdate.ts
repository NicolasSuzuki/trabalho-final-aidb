import { useState } from "react";

let forceUpdate = false
const onSetForceUpdateTrue = () => forceUpdate = true
const onSetForceUpdateFalse = () => forceUpdate = false
export {forceUpdate, onSetForceUpdateTrue, onSetForceUpdateFalse};