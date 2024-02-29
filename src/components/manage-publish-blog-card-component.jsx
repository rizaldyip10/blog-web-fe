import { Link } from "react-router-dom"
import { getDay } from "../common/date"
import { useState } from "react"

const ManagePublishedBlogCard = ({ blog }) => {

    let { banner, blog_id, title, publishedAt } = blog

    let [showStat, setShowStat] = useState(false)

    return (
        <>
            <div className="flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center">

                <img src={banner} className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover" />

                <div className="flex flex-col justify-between py-2 w-full min-w-[300px]">
                    <div>
                        <Link to={`/blog/${blog_id}`} className="blog-title mb-4 hover:underline">
                            {title}
                        </Link>
                        <p className="line-clamp-1">Published on {getDay(publishedAt)}</p>
                    </div>

                    <div className="flex gap-6 mt-3">
                        <Link to={`/editor/${blog_id}`} className="pr-4 py-2 underline">
                            Edit
                        </Link>

                        <button 
                            className="lg:hidden pr-4 py-2 underline"
                            onClick={() => setShowStat(preVal => !preVal)}
                        >
                            Stats
                        </button>

                        <button className="pr-4 py-2 underline text-red">
                            Delete
                        </button>
                    </div>
                </div>

                <div className="max-lg:hidden">
                
                </div>

            </div>
        </>
    )
}

export default ManagePublishedBlogCard