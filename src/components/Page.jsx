import { useEffect } from 'react'

function Page({ title, children }) {
  useEffect(() => {
    document.title = `${title} | ComplexApp`
    window.scroll(0, 0)
  }, [])

  return <>{children}</>
}

export default Page
