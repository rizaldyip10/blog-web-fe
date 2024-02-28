import { useEffect, useState } from "react"
import { activeTabRef } from "../components/inpage-navigation"
import axios from "axios"
import AnimationWrapper from "../common/page-animation"
import InPageNavigation from "../components/inpage-navigation"
import Loader from "../components/loader-component"
import BlogPostCard from "../components/blog-post-component"
import MinimalBlogPost from "../components/nobanner-blog-card-component"
import NoDataMessage from "../components/no-data-component"
import { filterPaginationData } from "../common/filter-pagination-data"
import LoadMoreDataBtn from "../components/load-more-component"

const HomePage = () => {

    const [blogs, setBlogs] = useState(null)
    const [trendingBlogs, setTrendingBlogs] = useState(null)
    let [pageState, setPageState] = useState("home")

    let categories = ["buildings", "celebrity", "entertainment", "gadget", "travel", "technology"]

    const fetchLatestBlog = ({page = 1}) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blog", { page })
        .then( async ({ data }) => {

            let formatedData = await filterPaginationData({
                state: blogs,
                data: data.blogs,
                page,
                countRoute: "/all-latest-blogs-count"
            })
            setBlogs(formatedData)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    const fetchTrendingBlog = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blog")
        .then(({ data }) => {
            setTrendingBlogs(data.blogs)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const fetchBlogByCategory = ({ page = 1 }) => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blog", { tag: pageState, page })
        .then( async ({ data }) => {

            let formatedData = await filterPaginationData({
                state: blogs,
                data: data.blogs,
                page,
                countRoute: "/search-blogs-count",
                dataToSend: { tag: pageState }
            })
            setBlogs(formatedData)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const loadBlogByCategory = (e) => {
        let category = e.target.innerText.toLowerCase()
        setBlogs(null)

        if (pageState == category) {
            setPageState("home")
            return
        }

        setPageState(category)
    }

    useEffect(() => {

        activeTabRef.current.click()

        if (pageState == "home") {
            fetchLatestBlog({ page: 1 })
        } else {
            fetchBlogByCategory({ page: 1 })
        }

        if (!trendingBlogs) {
            fetchTrendingBlog()
        }

    },[pageState])

    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* latest blogs */}
                <div className="w-full">
                    <InPageNavigation routes={[pageState, "trending blogs"]} defaultHidden={["trending blogs"]}>
                        
                        <>
                            {
                                blogs == null ? <Loader /> :
                                blogs.results.length ?
                                    blogs.results.map((blog, i) => {
                                        return (
                                            <AnimationWrapper 
                                                transition={{ duration: 1, delay: i*.1}} 
                                                key={i}
                                            >
                                                <BlogPostCard content={blog} author={blog.author.personal_info} />
                                            </AnimationWrapper>
                                        )
                                        
                                    })
                                : <NoDataMessage message="No blog published" />
                            }
                            <LoadMoreDataBtn state={blogs} fetchDataFunction={(pageState == "home" ? fetchLatestBlog : fetchBlogByCategory)} />
                        </>

                        {
                             trendingBlogs == null ? <Loader /> :
                             trendingBlogs.length ?
                                trendingBlogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper 
                                            transition={{ duration: 1, delay: i*.1}} 
                                            key={i}
                                        >
                                            <MinimalBlogPost blog={blog} index={i} />
                                        </AnimationWrapper>
                                    )
                                    
                                })
                            : <NoDataMessage message="No trending" />
                        }
                    </InPageNavigation>
                </div>

                {/* filters and trending blogs */}
                <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
                    <div className="flex flex-col gap-10">
                        <div>
                            <h1 className="font-medium text-xl mb-8">Stories from all interest</h1>

                            <div className="flex gap-3 flex-wrap">
                                {
                                    categories.map((category, i) => {
                                        return <button onClick={loadBlogByCategory} key={i} className={"tag " + (pageState == category ? "bg-black text-white " : "")}>
                                            { category }
                                        </button>
                                    })
                                }
                            </div>
                        </div>
                    

                        <div>
                            <h1 className="font-medium text-xl mb-8">
                                Trending <i className="fi fi-rr-arrow-trend-up"></i>
                            </h1>
                            {
                                trendingBlogs == null ? <Loader /> :
                                trendingBlogs.length ?
                                    trendingBlogs.map((blog, i) => {
                                        return (
                                            <AnimationWrapper 
                                                transition={{ duration: 1, delay: i*.1}} 
                                                key={i}
                                            >
                                                <MinimalBlogPost blog={blog} index={i} />
                                            </AnimationWrapper>
                                        )
                                        
                                    })
                                : <NoDataMessage message="No trending blog" />
                            }
                        </div>
                    </div>
                </div>
            </section>
        </AnimationWrapper>
    )
}

export default HomePage