import { Link } from "react-router-dom"
import pageNotFoundImgDark from "../images/404-light.png"
import pageNotFoundImgLight from "../images/404-dark.png"
import { useContext } from "react"
import { ThemeContext } from "../App"

const PageNotFound = () => {

    let { theme } = useContext(ThemeContext)
    
    return (
        <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
            <img src={theme == 'light' ? pageNotFoundImgLight : pageNotFoundImgDark} className="select-none border-2 border-grey w-72 aspect-square object-cover rounded" />

            <h1 className="text-4xl font-gelasio leading-7">
                Page Not Found
            </h1>

            <p className="text-dark-grey text-xl leading-7 -mt-8">
                The page you are looking for does not exist. Head back to the <Link to="/" className="text-black underline">home page.</Link>
            </p>

            <div className="mt-auto">
                <h1 className="font-bold text-2xl text-black font-gelasio">Pen n Pixel</h1>
                <p className="mt-2 text-dark-grey">Read millions of stories around the world</p>
            </div>
        </section>
    )
}

export default PageNotFound