import { createContext } from 'react'

/** Separate module so Fast Refresh won't mix Provider + hook in one boundary. */
export const AudioStateContext = createContext(null)
