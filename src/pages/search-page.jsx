import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { filterPaginationData } from "../common/filter-pagination-data"
import InPageNavigation from "../components/inpage-navigation"
import AnimationWrapper from "../common/page-animation"
import NoDataMessage from "../components/no-data-component"
import Loader from "../components/loader-component"
import LoadMoreDataBtn from "../components/load-more-component"
import BlogPostCard from "../components/blog-post-component"
import axios from "axios"
import UserCard from "../components/usercard-component"

const SearchPage = () => {

    let { query } = useParams()

    let [blogs, setBlogs] = useState(null)
    let [users, setUsers] = useState(null)

    const searchBlogs = ({ page = 1, createNewArr = false }) => {

        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blog", { query, page })
        .then( async ({ data }) => {

            let formatedData = await filterPaginationData({
                state: blogs,
                data: data.blogs,
                page,
                countRoute: "/search-blogs-count",
                dataToSend: { query },
                createNewArr
            })
            setBlogs(formatedData)
        })
        .catch(err => {
            console.log(err);
        })
    }

    const fetchUsers = () => {
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-users", { query })
        .then(({ data: { users } }) => {
            setUsers(users)
        })
    }

    useEffect(() => {

        resetState()
        searchBlogs({ page: 1, createNewArr: true })
        fetchUsers()

    }, [query])

    const resetState = () => {
        setBlogs(null)
    }

    const UserCardWrapper = () => {
        return (
            <>
                {
                    users == null ? <Loader /> :
                        users.length ?
                            users.map((user, i) => {
                                return (
                                    <AnimationWrapper key={i} transition={{ duration: 1, delay: i*.08 }}>
                                        <UserCard user={user} />
                                    </AnimationWrapper>
                                )
                            })
                        : <NoDataMessage message={"No user found"} />
                }
            </>
        )
    }

    return (
        <section className="h-cover flex justify-center gap-10">

            <div className="w-full">
                <InPageNavigation 
                    routes={[`Search results for ${query}`, "Account Matched"]}
                    defaultHidden={["Account Matched"]}
                >
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
                        <LoadMoreDataBtn state={blogs} fetchDataFunction={searchBlogs} />
                    </>

                    <UserCardWrapper />

                </InPageNavigation>
            </div>

            <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
                
                <h1 className="font-medium text-xl mb-8">
                    User related to search <i className="fi fi-rr-user mt-1"></i>
                </h1>
                <UserCardWrapper />
            </div>
    
        </section>
    )
}

export default SearchPage