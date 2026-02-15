'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../sanity.config'
import { useEffect } from 'react'

export default function Studio() {
    useEffect(() => {
        const originalError = console.error
        console.error = (...args) => {
            if (typeof args[0] === 'string' && args[0].includes('disableTransition')) {
                return
            }
            originalError.call(console, ...args)
        }

        return () => {
            console.error = originalError
        }
    }, [])

    return <NextStudio config={config} />
}
